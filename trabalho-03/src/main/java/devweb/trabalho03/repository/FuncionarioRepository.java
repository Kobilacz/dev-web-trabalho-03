package devweb.trabalho03.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import devweb.trabalho03.model.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {}
