const { Ok, usecase, step } = require("@herbsjs/herbs");

const dependency = {
  PlanoRepository: require("../../repository/db/PlanoRepository"),
};

const ObterPlanos = (injection) =>
  usecase("Obtém todos os planos cadastrados", {
    request: {},
    authorize: (user) => Ok(),
    setup: (ctx) => (ctx.di = Object.assign({}, dependency, injection)),

    "Busca todos planos": step(async (ctx) => {
      const planoRepository = new ctx.di.PlanoRepository();
      const planos = await planoRepository.buscarTodosPlanos();
      return (ctx.ret = {
        planos: planos,
      });
    }),
  });

module.exports = ObterPlanos;
