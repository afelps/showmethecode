const ObterPlanos = require("./ObterPlanos");
const assert = require("assert");

describe("Obter Planos", () => {
  it("Deve retornar planos esperados", async () => {
    //Dado
    const planos = [
      { id: 1, nome: "FaleMais 30", minutos: 30 },
      { id: 2, nome: "FaleMais 60", minutos: 60 },
    ];
    const injection = {
      PlanoRepository: class {
        buscarTodosPlanos() {
          return planos;
        }
      },
    };

    //Quando
    const uc = ObterPlanos(injection);
    await uc.authorize();
    const retorno = await uc.run();

    //Então
    assert.ok(retorno.isOk);
    assert.deepStrictEqual(retorno.value, { planos: planos });
  });

  it("Deve retornar lista vazia com nenhum plano cadastrado", async () => {
    // Dado
    const planos = [];
    const injection = {
      PlanoRepository: class {
        buscarTodosPlanos() {
          return planos;
        }
      },
    };

    // Quando
    const uc = ObterPlanos(injection);
    await uc.authorize();
    const retorno = await uc.run();

    // Então
    assert.ok(retorno.isOk);
    assert.deepStrictEqual(retorno.value, { planos: planos });
  });
});
