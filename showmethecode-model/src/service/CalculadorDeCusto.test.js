const assert = require("assert");
const CalculadorDeCusto = require("./CalculadorDeCusto");

describe("Calculo de custo de tarifas", () => {
  describe("Calculo de custo padrão", () => {
    it("Deve utilizar valor de tarifa e duracao", () => {
      //Dado
      const [calculador, duracao, tarifa] = [new CalculadorDeCusto(), 10, 1];

      //Quando
      const custo = calculador.obterCustoPadrao(duracao, tarifa);

      //Então
      assert.strictEqual(custo, 10);
    });

    it("Deve ser gratuito para duracao 0", () => {
      //Dado
      const [calculador, duracao, tarifa] = [new CalculadorDeCusto(), 0, 1000];

      //Quando
      const custo = calculador.obterCustoPadrao(duracao, tarifa);

      //Então
      assert.strictEqual(custo, 0);
    });

    it("Deve ser gratuito para tarifa 0", () => {
      //Dado
      const [calculador, duracao, tarifa] = [new CalculadorDeCusto(), 1000, 0];

      //Quando
      const custo = calculador.obterCustoPadrao(duracao, tarifa);

      //Então
      assert.strictEqual(custo, 0);
    });

    it("Deve ser gratuito em resultado negativo", () => {
      //Dado
      const [calculador, duracao, tarifa] = [new CalculadorDeCusto(), -1, 30];

      //Quando
      const custo = calculador.obterCustoPadrao(duracao, tarifa);

      //Então
      assert.strictEqual(custo, 0);
    });
  });

  describe("Calculo de custo com plano", () => {
    it("Deve ser gratuito com duracao inferior a minutos gratuitos de plano", () => {
      //Dado
      const calculador = new CalculadorDeCusto();
      const [duracao, tarifa, minutos] = [9, 1.5, 10];

      //Quando
      const custo = calculador.obterCustoComPlano(duracao, tarifa, minutos);

      //Então
      assert.strictEqual(custo, 0);
    });

    it("Deve ser gratuito com duracao igual a minutos gratuitos de plano", () => {
      //Dado
      const calculador = new CalculadorDeCusto();
      const [duracao, tarifa, minutos] = [10, 1.5, 10];

      //Quando
      const custo = calculador.obterCustoComPlano(duracao, tarifa, minutos);

      //Então
      assert.strictEqual(custo, 0);
    });

    it("Deve utilizar modificador de tarifa em calculo de custo", () => {
      //Dado
      const calculador = new CalculadorDeCusto({
        modificadorDeTarifaComPlano: 1.1,
      });
      const [duracao, tarifa, minutos] = [20, 1, 0];

      //Quando
      const custo = calculador.obterCustoComPlano(duracao, tarifa, minutos);

      //Então
      assert.strictEqual(custo, 22);
    });

    it("Deve descontar minutos gratuitos de plano", () => {
      //Dado
      const calculador = new CalculadorDeCusto({
        modificadorDeTarifaComPlano: 1.1,
      });
      const [duracao, tarifa, minutos] = [20, 1, 10];

      //Quando
      const custo = calculador.obterCustoComPlano(duracao, tarifa, minutos);

      //Então
      assert.strictEqual(custo, 11);
    });

    it("Deve utilizar sobreescrita de modificador de tarifa com plano", () => {
      //Dado
      const calculadorDez = new CalculadorDeCusto({
        modificadorDeTarifaComPlano: 1.1,
      });
      const calculadorCinquenta = new CalculadorDeCusto({
        modificadorDeTarifaComPlano: 1.5,
      });
      const [duracao, tarifa, minutos] = [20, 1, 10];

      //Quando
      const custoDez = calculadorDez.obterCustoComPlano(
        duracao,
        tarifa,
        minutos
      );
      const custoCinquenta = calculadorCinquenta.obterCustoComPlano(
        duracao,
        tarifa,
        minutos
      );

      //Então
      assert.strictEqual(custoDez, 11);
      assert.strictEqual(custoCinquenta, 15);
    });
  });
});
