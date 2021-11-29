const { entity, field } = require("@herbsjs/herbs");

const Plano = entity("Plano", {
  nome: field(String, {
    validation: { presence: true, length: { minimum: 6 } },
  }),
  minutos: field(Number, {
    validation: { presence: true, numericality: { greaterThan: 0 } },
  }),
});

module.exports = Plano;
