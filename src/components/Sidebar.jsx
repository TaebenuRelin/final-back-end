import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Sidebar extends Component {
  render() {
    const listItemStyle = {
      width: "100%",
      textAlign: "center",
      marginBottom: "40px", // Menambahkan jarak antara tombol
    };

    return (
      <div className="sidebar sidebarStyle">
        <div
          className="sidebar-header"
          style={{ padding: "20px 20px 40px 20px", textAlign: "center" }}
        >
          <h3>Resep Masakan Manado</h3>
        </div>
        <ul
          className="list-unstyled"
          style={{ paddingLeft: "0", listStyle: "none", width: "100%" }}
        >
          <li style={listItemStyle}>
            <NavLink to="/" className="buttonStyle">
              Home
            </NavLink>
          </li>
          <li style={listItemStyle}>
            <NavLink to="/chatbot" className="buttonStyle">
              Chatbot
            </NavLink>
          </li>
          <li style={listItemStyle}>
            <NavLink to="/about" className="buttonStyle">
              About
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
