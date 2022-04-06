import React, { Component } from "react";
import FuncionarioDataService from "../services/funcionarioDataService";
import { Link } from "react-router-dom";

export default class ListFuncionario extends Component {
  constructor(props) {
    super(props);

    this.retrieveFuncionarios = this.retrieveFuncionarios.bind(this);

    this.state = {
      funcionarios: [],
    };
  }

  componentDidMount() {
    this.retrieveFuncionarios();
  }

  retrieveFuncionarios() {
    FuncionarioDataService.getAll()
      .then((response) => {
        this.setState({
          funcionarios: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { funcionarios } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Funcionários</h4>
          <ul className="list-group">
            {funcionarios && funcionarios.map((funcionario) => <li>{funcionario.nome}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}
