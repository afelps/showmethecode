const { entity, field } = require("@herbsjs/herbs");

const Chamada = entity("Chamada", {
  origem: field(String, {
    validation: { presence: true },
  }),
  destino: field(String, {
    validation: { presence: true },
  }),
  plano: field(String, {
    validation: { presence: true, length: { minimum: 6 } },
  }),
  duracao: field(Number, {
    validation: { presence: true, numericality: { greaterThan: 0 } },
  }),
});

module.exports = Chamada;
