package devweb.trabalho03.control;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import devweb.trabalho03.model.Funcionario;
import devweb.trabalho03.repository.FuncionarioRepository;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/api")
public class FuncionarioController {

  @Autowired
  FuncionarioRepository funcRep;

  // POST /api/funcionarios -> criar funcionário
  @PostMapping("/funcionarios")
  public ResponseEntity<Funcionario> createFuncionario(@RequestBody Funcionario funcionario) {
    try {
      Funcionario _funcionario = funcRep.save(new Funcionario(funcionario.getNome(), funcionario.getCpf()));
      return new ResponseEntity<>(_funcionario, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // GET /api/funcionarios -> listar todos os funcionários
  @GetMapping("/funcionarios")
  public ResponseEntity<List<Funcionario>> getAllFuncionarios() {
    try {
      List<Funcionario> lf = new ArrayList<Funcionario>();
      funcRep.findAll().forEach(lf::add);

      if (lf.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(lf, HttpStatus.OK);

    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // GET /api/funcionarios/:id -> listar funcionário dado um id
  @GetMapping("/funcionarios/{id}")
  public ResponseEntity<Funcionario> getFuncionarioById(@PathVariable("id") long id) {
    Optional<Funcionario> data = funcRep.findById(id);
    if (data.isPresent()) {
      return new ResponseEntity<>(data.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // DEL /api/funcionarios/:id -> remover funcionário dado um id
  @DeleteMapping("/funcionarios/{id}")
  public ResponseEntity<HttpStatus> deleteFuncionario(@PathVariable("id") long id) {
    try {
      funcRep.deleteById(id);
      return new ResponseEntity<>(HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // DEL /api/funcionarios -> remover todos os funcionários
  @DeleteMapping("/funcionarios")
  public ResponseEntity<HttpStatus> deleteAllFuncionario() {
    try {
      funcRep.deleteAll();
      return new ResponseEntity<>(HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
