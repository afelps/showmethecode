const database = require("../../config/database");

class PlanoRepository {
  async buscarPlano(nome) {
    try {
      return database.planos.filter((x) => x.nome == nome).pop();
    } catch (err) {
      throw new Error(err);
    }
  }
  async buscarTodosPlanos() {
    try {
      return database.planos;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = PlanoRepository;
