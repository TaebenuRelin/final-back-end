import React, { Component } from "react";
import "./about.css"; // Pastikan untuk mengimpor file CSS jika diperlukan

class About extends Component {
  render() {
    return (
      <div className="card bga about-container">
        <div className="about-card">
          <div className="text-center mt-5">
            <h1></h1>
          </div>
          <div className="about-content">
            <h6>
              ChatBot ini menyiapkan resep makanan
              khas Sulawesi Utara. Bagi kalian semua 
              yang ingin belajar masak, silahkan
              menggunakan ChatBot kami.
            </h6>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
