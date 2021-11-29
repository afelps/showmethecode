const Plano = require("./Plano");
const assert = require("assert");

const assertPlanoValido = (nome, minutos, validacao) => {
  const plano = Plano.fromJSON({ nome: nome, minutos: minutos });
  assert.ok(plano.isValid() == validacao);
  return plano;
};

describe("Teste plano", () => {
  describe("Plano válido", () => {
    it("Deve possuir nome válido", async () => {
      assertPlanoValido("Meu novo plano 360", 20, true);
      assertPlanoValido("FalaMais 30", 20, true);
    });
    it("Deve possuir minutos válido", async () => {
      assertPlanoValido("FalaMais 30", 1, true);
      assertPlanoValido("FalaMais 30", 30, true);
      assertPlanoValido("FalaMais 30", 2.5, true);
    });
  });

  describe("Plano inválido", () => {
    it("Deve possuir nome inválido", async () => {
      const plano = assertPlanoValido("Plano", 20, false);
      assert.deepEqual(plano.errors, { nome: [{ isTooShort: 6 }] });
    });
    it("Deve possuir minutos inválido", async () => {
      const valorZero = assertPlanoValido("FalaMais 30", 0, false);
      const valorNegativo = assertPlanoValido("FalaMais 30", -10, false);
      assert.deepEqual(valorZero.errors, { minutos: [{ notGreaterThan: 0 }] });
      assert.deepEqual(valorNegativo.errors, {
        minutos: [{ notGreaterThan: 0 }],
      });
    });
  });
});
