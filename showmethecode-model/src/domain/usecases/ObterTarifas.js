const { Ok, usecase, step } = require("@herbsjs/herbs");

const dependency = {
  TarifaRepository: require("../../repository/db/TarifaRepository"),
};

const ObterTarifas = (injection) =>
  usecase("Obtém todas as tarifas cadastradas", {
    request: {},
    authorize: (user) => Ok(),
    setup: (ctx) => (ctx.di = Object.assign({}, dependency, injection)),

    "Busca todas tarifas": step(async (ctx) => {
      const tarifaRepository = new ctx.di.TarifaRepository();
      const tarifas = await tarifaRepository.buscarTodasTarifas();
      return (ctx.ret = {
        tarifas: tarifas,
      });
    }),
  });

module.exports = ObterTarifas;
