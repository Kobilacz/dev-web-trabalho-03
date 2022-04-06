import http from "../http-common";

class FuncionarioDataService {
  getAll() {
    return http.get("/funcionarios");
  }

  create(data) {
    return http.post("/funcionarios", data);
  }
}

export default new FuncionarioDataService();
