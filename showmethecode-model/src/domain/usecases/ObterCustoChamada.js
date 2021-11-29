const { Ok, usecase, step, Err } = require("@herbsjs/herbs");
const Chamada = require("../entities/Chamada");

const dependency = {
  TarifaRepository: require("../../repository/db/TarifaRepository"),
  PlanoRepository: require("../../repository/db/PlanoRepository"),
  CalculadorDeCusto: require("../../service/CalculadorDeCusto"),
};

const ObterCustoChamada = (injection) =>
  usecase("Obtém custo de chamada por plano e DDD", {
    request: {
      origem: String,
      destino: String,
      duracao: Number,
      plano: String,
    },
    authorize: (user) => Ok(),
    setup: (ctx) => (ctx.di = Object.assign({}, dependency, injection)),

    "Checa se chamada é valida": step(async (ctx) => {
      ctx.chamada = new Chamada();
      ctx.chamada.origem = ctx.req.origem;
      ctx.chamada.destino = ctx.req.destino;
      ctx.chamada.duracao = ctx.req.duracao;
      ctx.chamada.plano = ctx.req.plano;
      if (!ctx.chamada.isValid()) return Err(ctx.chamada.errors);
      return Ok();
    }),

    "Busca dados de tarifa e plano": step(async (ctx) => {
      const tarifaRepo = new ctx.di.TarifaRepository();
      const planoRepo = new ctx.di.PlanoRepository();
      const { origem, destino, plano } = ctx.chamada;
      ctx.tarifa = await tarifaRepo.buscarTarifa(origem, destino);
      if (!ctx.tarifa) {
        return Err(`Tarifa não encontrada (${origem} - ${destino})`);
      }
      ctx.plano = await planoRepo.buscarPlano(plano);
      if (!ctx.plano) {
        return Err(`Plano ${plano} não encontrado`);
      }
      return Ok();
    }),

    "Calcula custo de chamada": step(async (ctx) => {
      const calculador = new ctx.di.CalculadorDeCusto();
      const { duracao } = ctx.chamada;
      const { valor } = ctx.tarifa;
      const { minutos } = ctx.plano;
      return (ctx.ret = {
        tarifa: ctx.tarifa,
        plano: ctx.plano,
        duracao: duracao,
        custoPadrao: calculador.obterCustoPadrao(duracao, valor),
        custoComPlano: calculador.obterCustoComPlano(duracao, valor, minutos),
      });
    }),
  });

module.exports = ObterCustoChamada;
