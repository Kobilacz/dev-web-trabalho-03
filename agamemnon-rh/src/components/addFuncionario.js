import React, { Component } from "react";
import FuncionarioDataService from "../services/funcionarioDataService";

function mascara_cpf() {
  var cpf = document.getElementById("cpf");
  if (cpf.value.length === 3 || cpf.value.length === 7) {
    cpf.value += ".";
  } else if (cpf.value.length === 11) {
    cpf.value += "-";
  }
}

export default class AddFuncionario extends Component {
  constructor(props) {
    super(props);

    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeCpf = this.onChangeCpf.bind(this);
    this.newFuncionario = this.newFuncionario.bind(this);
    this.saveFuncionario = this.saveFuncionario.bind(this);

    this.state = {
      id: null,
      nome: "",
      cpf: "",
      enviado: false,
    };
  }

  onChangeNome(e) {
    this.setState({
      nome: e.target.value,
    });
  }

  onChangeCpf(e) {
    this.setState({
      cpf: e.target.value,
    });
  }

  newFuncionario() {
    this.setState({
      id: null,
      nome: "",
      cpf: "",
      enviado: false,
    });
  }

  saveFuncionario(event) {
    event.preventDefault();
    var data = {
      nome: this.state.nome,
      cpf: this.state.cpf,
    };

    FuncionarioDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          nome: response.data.nome,
          cpf: response.data.cpf,
          enviado: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <form onSubmit={this.saveFuncionario} className="add-funcionario-container">
        {this.state.enviado ? (
          <div className="data-container">
            <h4 className="success-message">Funcionário salvo com sucesso!</h4>
            <div className="button-container">
              <button className="btn btn-primary" onClick={this.newFuncionario}>
                Adicionar novo funcionário
              </button>
            </div>
          </div>
        ) : (
          <div className="data-container">
            <h3 className="title-container">Adicionar funcionário</h3>
            <div className="input-container">
              <label htmlFor="nome">
                <b>Nome</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="nome"
                required
                value={this.state.nome}
                onChange={this.onChangeNome}
                name="nome"
                autoComplete="off"
              />
            </div>

            <div className="input-container">
              <label htmlFor="cpf">
                <b>CPF</b>
              </label>
              <input
                type="text"
                className="form-control"
                id="cpf"
                required
                value={this.state.cpf}
                onChange={this.onChangeCpf}
                name="cpf"
                maxLength={14}
                onKeyUp={mascara_cpf}
                autoComplete="off"
              />
            </div>

            <div className="button-container-add">
              <button className="btn btn-primary" type="submit">
                Adicionar
              </button>
            </div>
          </div>
        )}
      </form>
    );
  }
}
