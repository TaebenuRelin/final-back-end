import logobot from "./bot.jpg";
import "../../src/App.css"; 
import {
  build_dictionary,
  clean_input,
  response_user,
  response_bot,
  get_time,
} from "../../src/functions.js";
import $ from "jquery";
import Header from "./Header.jsx";
//ini for side bar

// get data
const brain = require("brain.js");
const trainingPhrases = require("../data/data-patterns.json");
const data_responses = require("../data/data-responses.json");

// build dictionary
const dictionary = build_dictionary(trainingPhrases);
//console.log(dictionary); // print dictionary
console.log("Input: Mercy, Shannon, Asen"); // test encoding text input
console.log("Encoded: " + encode("Asen, Shannon, Mercy")); // test encoding text input

// prepare your training data
const trainingSet = trainingPhrases.map((dataSet) => {
  const encodedValue = encode(dataSet.phrase);
  return { input: encodedValue, output: dataSet.result };
});
function get_date(dateTime) {
  return dateTime.toLocaleDateString(); // Mengembalikan tanggal
}
// train neural network
const model_network = new brain.NeuralNetwork();
model_network.train(trainingSet);

// encoding text to number format
function encode(phrase) {
  const phraseTokens = phrase.split(" ");
  const encodedPhrase = dictionary.map((word) =>
    phraseTokens.includes(word) ? 1 : 0
  );

  return encodedPhrase;
}
// component function
function Chatbot() {
  // make a prediction
  function predict_bot(txt_chat_input) {
    // encode input text
    const encoded = encode(clean_input(txt_chat_input));
    // predict the response
    const json_output = model_network.run(encoded);
    console.log(
      "Max Categories: " + Object.values(json_output).length + " intents."
    );
    console.log(json_output);

    // get max value using apply
    const max = Math.max.apply(null, Object.values(json_output));
    const index = Object.values(json_output).indexOf(max);
    // get probability and pred_label
    const pred_label = Object.keys(json_output)[index];
    const pred_prob = json_output["" + pred_label];
    var pred_response = "";
    for (var no in data_responses) {
      if (data_responses[no]["" + pred_label] != null) {
        pred_response = data_responses[no]["" + pred_label];
      }
    }

    // log input, predicted label, probability, and response
    console.log("Input Text: " + clean_input(txt_chat_input));
    console.log(
      "Predicted Label (" + pred_label + "), Probability (" + pred_prob + ")"
    );
    console.log("Predicted Response: " + pred_response);

    console.log(
      "Predicted label (" + pred_label + "), probability (" + pred_prob + ")."
    );
    return [pred_response, pred_prob];
  }

  // compile/execute chatbot
  function run_chatbot() {
    var input_chat = $("#input-chat").val(); // get input chat
    if (input_chat.length === 0) {
      alert("Sorry, write your text chat first.");
    } else {
      $("#content-chat-feed").append(
        response_user(input_chat, get_date(new Date()), get_time(new Date()))
      );
      force_scroll_bottom();

      // predict response chatbot
      const [respond_bot, prob_bot] = predict_bot(input_chat);
      const prob_val = (parseFloat(prob_bot) * 100).toFixed(2);

      console.log("Response: " + respond_bot);

      const threshold = 75;
      if (prob_val > threshold) {
        $("#content-chat-feed").append(
          response_bot(
            respond_bot,
            prob_val,
            get_time(new Date()),
            get_date(new Date())
          )
        );
      } else {
        $("#content-chat-feed").append(
          response_bot(
            "Maaf, Saya belum mengerti.",
            prob_val,
            get_time(new Date()),
            get_date(new Date())
          )
        );
      }
      // scroll bottom
      force_scroll_bottom();
      // set empty input
      $("#input-chat").val("");
    }
  }

  // Force scrollbar to bottom
  function force_scroll_bottom() {
    const el = document.getElementById("content-chat-feed");
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }

  // handle button function
  const handleButtonSend = () => {
    // compile chatbot brain.js
    run_chatbot();
  };

  // pressing Enter key
  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // compile chatbot brain.js
      run_chatbot();
    }
  };

  return (
    <div className="App w-100 ">
      <div className="card d-flex inka flex-column vh-100 overflow-hidden w-100">
        <Header />
        <div
          className="card-body"
          style={
            { overflowY: "scroll" } //ubah disini dpe background
          }
          id="content-chat-feed"
        >
          <div className="containerbot">
            <img src={logobot} alt="Avatar" style={{ width: "100%" }} />
            <div className="row">
              <div className="col-sm-8 pt-3">Welcome to our ChatBot :)</div>
              <div className="col-sm-4 pt-1 ">
                <span className=" time-right">
                  98.99%
                  <br />
                  {get_time(new Date(), true)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer d-flex">
          <input
            type="text"
            className="form-control flex-grow-1"
            id="input-chat"
            onKeyDown={_handleKeyDown}
            style={{ marginRight: "10px" }}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleButtonSend}
          >
            Send
          </button>
        </div> 
      </div>
    </div>
  );
}

export default Chatbot;