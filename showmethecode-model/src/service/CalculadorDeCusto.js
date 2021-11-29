class CalculadorDeCusto {
  constructor(options = { modificadorDeTarifaComPlano: 1.1 }) {
    this.options = options;
  }

  obterCustoPadrao(duracao, tarifa) {
    return Math.max(duracao * tarifa, 0);
  }

  obterCustoComPlano(duracao, tarifa, minutosGratuitos) {
    const duracaoCobrada = Math.max(duracao - minutosGratuitos, 0);
    const tarifaCobrada = tarifa * this.options.modificadorDeTarifaComPlano;
    return Math.max(duracaoCobrada * tarifaCobrada);
  }
}

module.exports = CalculadorDeCusto;
