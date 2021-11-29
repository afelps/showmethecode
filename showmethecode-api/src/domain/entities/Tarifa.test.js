const Tarifa = require("./Tarifa");
const assert = require("assert");

const assertTarifaValida = (origem, destino, valor, validacao) => {
  const tarifa = Tarifa.fromJSON({
    origem: origem,
    destino: destino,
    valor: valor,
  });
  assert.ok(tarifa.isValid() == validacao);
  return tarifa;
};

describe("Teste tarifa", () => {
  describe("Tarifa válida", () => {
    it("Deve possuir origem válida", async () => {
      assertTarifaValida("011", "011", 1, true);
      assertTarifaValida("099", "011", 1, true);
    });
    it("Deve possuir destino válido", async () => {
      assertTarifaValida("011", "021", 1, true);
      assertTarifaValida("011", "099", 1, true);
    });
    it("Deve possuir valor válido", async () => {
      assertTarifaValida("011", "011", 0.1, true);
      assertTarifaValida("011", "011", 1, true);
      assertTarifaValida("011", "011", 30, true);
    });
  });
  describe("Tarifa invalida", () => {
    it("Deve possuir origem inválida", async () => {
      const tarifa = assertTarifaValida(undefined, "011", 1, false);
      assert.deepEqual(tarifa.errors, { origem: [{ cantBeEmpty: true }] });
    });

    it("Deve possuir destino inválido", async () => {
      const tarifa = assertTarifaValida("011", undefined, 1, false);
      assert.deepEqual(tarifa.errors, { destino: [{ cantBeEmpty: true }] });
    });

    it("Deve possuir valor inválido", async () => {
      const tarifaUndefined = assertTarifaValida(
        "011",
        "012",
        undefined,
        false
      );
      const tarifaNegativa = assertTarifaValida("011", "012", -10, false);
      const tarifaZero = assertTarifaValida("011", "012", 0, false);

      assert.deepEqual(tarifaUndefined.errors, {
        valor: [{ cantBeEmpty: true }],
      });
      assert.deepEqual(tarifaNegativa.errors, {
        valor: [{ notGreaterThan: 0 }],
      });
      assert.deepEqual(tarifaZero.errors, {
        valor: [{ notGreaterThan: 0 }],
      });
    });
  });
});
