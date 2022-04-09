import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, BrowserRouter, Route, Link } from "react-router-dom";

import AddFuncionario from "./components/addFuncionario";
import ListFuncionario from "./components/listFuncionario";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <div className="container">
              <Link to={"/"} className="navbar-brand">
                <b>
                  <i>Agamemnon RH</i>
                </b>
              </Link>
              <div className="navbar-nav mr-auto">
                <li className="nav_item">
                  <Link to={"/add"} className="nav-link">
                    Adicionar funcionário
                  </Link>
                </li>
                <li className="nav_item">
                  <Link to={"/list"} className="nav-link">
                    Listar todos os funcionários
                  </Link>
                </li>
              </div>
            </div>
          </nav>
          <div className="container mt-3">
            <Routes>
              <Route element={<ListFuncionario />} path="/" />
              <Route element={<ListFuncionario />} path="/list" />
              <Route element={<AddFuncionario />} path="/add" />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
