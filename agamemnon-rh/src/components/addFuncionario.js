import React, { Component } from "react";
import FuncionarioDataService from "../services/funcionarioDataService";

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

  saveFuncionario() {
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
      <div className="submit-form">
        {this.state.enviado ? (
          <div>
            <h4>O funcionário foi salvo com sucesso!</h4>
            <button className="btn btn-success" onClick={this.newFuncionario}>
              Adicionar novo funcionário
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="nome">
                <strong>Nome</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="nome"
                required
                value={this.state.nome}
                onChange={this.onChangeNome}
                name="nome"
              />
            </div>

            <div className="form-group">
              <label htmlFor="cpf">
                <strong>CPF</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="cpf"
                required
                value={this.state.cpf}
                onChange={this.onChangeCpf}
                name="cpf"
              />
            </div>
            <p></p>
            <button onClick={this.saveFuncionario} className="btn btn-success">
              Salvar
            </button>
          </div>
        )}
      </div>
    );
  }
}
