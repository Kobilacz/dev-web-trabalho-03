package devweb.trabalho03.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "funcionario")
public class Funcionario {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @Column
  private String nome;

  @Column
  private String cpf;

  public Funcionario() {

  }

  public Funcionario(String nome, String cpf) {
    this.nome = nome;
    this.cpf = cpf;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getNome(){
    return nome;
  }

  public void setNome(String nome) {
    this.nome = nome;
  }

  public String getCpf() {
    return cpf;
  }

  public void setCpf(String cpf) {
    this.cpf = cpf;
  }

  @Override
  public String toString() {
    return "Funcionário [id = " + id + ", nome = " + nome + ", CPF = " + cpf + "]";
  }
}