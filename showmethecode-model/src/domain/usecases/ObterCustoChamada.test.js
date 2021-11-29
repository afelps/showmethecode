const assert = require("assert");
const ObterCustoChamada = require("./ObterCustoChamada");

const injectionPadrao = {
  TarifaRepository: class {
    buscarTarifa(origem, destino) {
      return { id: 1, origem: "011", destino: "016", valor: 1.9 };
    }
  },
  PlanoRepository: class {
    buscarPlano(plano) {
      return { id: 1, nome: "FaleMais 30", minutos: 30 };
    }
  },
  CalculadorDeCusto: class {
    obterCustoPadrao(duracao, valor) {
      return 10;
    }
    obterCustoComPlano(duracao, valor, minutos) {
      return 0;
    }
  },
};

describe("Obter Custo de Chamada", () => {
  describe("Chamadas válidas", () => {
    it("Deve retornar valores esperados", async () => {
      //Dado
      const injection = injectionPadrao;
      const parameters = {
        origem: "011",
        destino: "016",
        duracao: 20,
        plano: "FaleMais 30",
      };

      //Quando
      const uc = ObterCustoChamada(injection);
      await uc.authorize();
      const retorno = await uc.run(parameters);

      //Então
      assert.ok(retorno.isOk);
      assert.deepStrictEqual(retorno.value, {
        tarifa: { id: 1, origem: "011", destino: "016", valor: 1.9 },
        plano: { id: 1, nome: "FaleMais 30", minutos: 30 },
        duracao: 20,
        custoPadrao: 10,
        custoComPlano: 0,
      });
    });
  });
  describe("Chamadas Inválidas", () => {
    it("Deve não encontrar tarifa", async () => {
      //Dado
      const injection = Object.assign({}, injectionPadrao, {
        TarifaRepository: class {
          buscarTarifa(origem, destino) {
            return undefined;
          }
        },
      });
      const parameters = {
        origem: "987",
        destino: "123",
        duracao: 20,
        plano: "FaleMais 30",
      };

      //Quando
      const uc = ObterCustoChamada(injection);
      await uc.authorize();
      const retorno = await uc.run(parameters);

      //Então
      assert.ok(!retorno.isOk);
    });

    it("Deve não encontrar plano", async () => {
      //Dado
      const injection = Object.assign(injectionPadrao, {
        PlanoRepository: class {
          buscarPlano(plano) {
            return undefined;
          }
        },
      });
      const parameters = {
        origem: "011",
        destino: "016",
        duracao: 20,
        plano: "Inexistente",
      };

      //Quando
      const uc = ObterCustoChamada(injection);
      await uc.authorize();
      const retorno = await uc.run(parameters);

      //Então
      console.log("retorno", JSON.stringify(retorno));
      assert.ok(!retorno.isOk);
    });

    it("Deve recusar duracao NaN", async () => {
      //Dado
      const injection = injectionPadrao;
      const parameters = {
        origem: "011",
        destino: "016",
        duracao: NaN,
        plano: "FaleMais 30",
      };

      //Quando
      const uc = ObterCustoChamada(injection);
      await uc.authorize();
      const retorno = await uc.run(parameters);

      //Então
      assert.ok(!retorno.isOk);
    });
  });
});
