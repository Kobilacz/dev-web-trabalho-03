import http from "../http-common";

class FuncionarioDataService {
  getAll() {
    return http.get("/funcionarios");
  }

  create(data) {
    return http.post("/funcionarios", data);
  }

  delete(id) {
    return http.delete(`/funcionarios/${id}`);
  }

  deleteAll() {
    return http.delete("/funcionarios");
  }
}

export default new FuncionarioDataService();
