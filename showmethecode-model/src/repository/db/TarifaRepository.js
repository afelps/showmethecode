const database = require("../../config/database");

class TarifaRepository {
  async buscarTarifa(origem, destino) {
    try {
      return database.tarifas.find(
        (x) => x.origem == origem && x.destino == destino
      );
    } catch (err) {
      throw new Error(err);
    }
  }
  async buscarTodasTarifas() {
    try {
      return database.tarifas;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = TarifaRepository;
