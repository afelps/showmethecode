const Chamada = require("./Chamada");
const assert = require("assert");

const obterChamada = (values) => {
  defaultValues = {
    origem: "011",
    destino: "011",
    duracao: 20,
    plano: "FaleMais 30",
  };
  const chamada = Chamada.fromJSON(Object.assign(defaultValues, values));
  return chamada;
};

describe("Teste chamada", () => {
  describe("Chamada válida", () => {
    it("Deve possuir origem e destino válidos", async () => {
      const input = [
        ["011", "017"],
        ["020", "099"],
        ["987", "123"],
        ["011", "011"],
      ];
      const chamadas = input.map(([origem, destino]) =>
        obterChamada({ origem: origem, destino: destino })
      );
      chamadas.forEach((chamada) => assert.ok(chamada.isValid()));
    });
    it("Deve possuir duracao válida", async () => {
      const input = [20, 1, 10, 100, 1000, 999999999];
      const chamadas = input.map((duracao) =>
        obterChamada({ duracao: duracao })
      );
      chamadas.forEach((chamada) => assert.ok(chamada.isValid()));
    });
    it("Deve possuir plano válido", async () => {
      const input = ["Plano válido", "FaleMais 30"];
      const chamadas = input.map((plano) => obterChamada({ plano: plano }));
      chamadas.forEach((chamada) => assert.ok(chamada.isValid()));
    });
  });

  describe("Chamada inválida", () => {
    it("Deve aceitar apenas números válidos como duracao", async () => {
      const input = ["20", NaN, "asd"];
      const chamadas = input.map((duracao) =>
        obterChamada({ duracao: duracao })
      );
      chamadas.forEach((chamada) => assert.ok(!chamada.isValid()));
    });
  });
});
