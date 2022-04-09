import React, { Component } from "react";
import FuncionarioDataService from "../services/funcionarioDataService";
import { Link } from "react-router-dom";

export default class ListFuncionario extends Component {
  constructor(props) {
    super(props);

    this.retrieveFuncionarios = this.retrieveFuncionarios.bind(this);
    this.removeAll = this.deleteAll.bind(this);

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

  deleteAll() {
    FuncionarioDataService.deleteAll()
      .then((response) => {
        this.setState((prevState) => {
          console.log(prevState);
          return { funcionarios: [] };
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteFuncionario(id) {
    FuncionarioDataService.delete(id)
      .then((response) => {
        this.setState((prevState) => {
          console.log(prevState);
          return { funcionarios: prevState.funcionarios.filter((func) => func.id !== id) };
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
      <div className="table-container">
        {funcionarios.length > 0 ? (
          <div>
            <h3 className="title-container">
              <b>Funcionários</b>
            </h3>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">CPF</th>
                  <th scope="col">Ação</th>
                </tr>
              </thead>
              <tbody>
                {funcionarios.map((funcionario) => (
                  <tr key={funcionario.id}>
                    <td>{funcionario.nome}</td>
                    <td className="centralized">{funcionario.cpf}</td>
                    <td className="centralized">
                      {
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            this.deleteFuncionario(funcionario.id);
                          }}
                        >
                          Excluir
                        </button>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="centralized-button">
              <button className="btn btn-primary" onClick={this.removeAll}>
                Excluir todos os funcionários
              </button>
            </div>
          </div>
        ) : (
          <h3 className="centralized">Nenhum funcionário cadastrado!</h3>
        )}
      </div>
    );
  }
}
