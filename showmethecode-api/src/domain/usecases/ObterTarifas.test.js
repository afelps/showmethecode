const ObterTarifas = require("./ObterTarifas");
const assert = require("assert");

describe("Obter Tarifas", () => {
  it("Deve retornar tarifas esperadas", async () => {
    //Dado
    const tarifas = [
      { id: 1, origem: "011", destino: "016", valor: 1.9 },
      { id: 2, origem: "016", destino: "011", valor: 2.9 },
      { id: 3, origem: "011", destino: "017", valor: 1.7 },
    ];
    const injection = {
      TarifaRepository: class {
        buscarTodasTarifas() {
          return tarifas;
        }
      },
    };

    //Quando
    const uc = ObterTarifas(injection);
    await uc.authorize();
    const retorno = await uc.run();

    //Então
    assert.ok(retorno.isOk);
    assert.deepStrictEqual(retorno.value, { tarifas: tarifas });
  });

  it("Deve retornar lista vazia com nenhuma tarifa cadastrada", async () => {
    // Dado
    const tarifas = [];
    const injection = {
      TarifaRepository: class {
        buscarTodasTarifas() {
          return tarifas;
        }
      },
    };

    // Quando
    const uc = ObterTarifas(injection);
    await uc.authorize();
    const retorno = await uc.run();

    // Então
    assert.ok(retorno.isOk);
    assert.deepStrictEqual(retorno.value, { tarifas: tarifas });
  });
});
