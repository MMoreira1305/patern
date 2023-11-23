const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importe a instância do Sequelize configurada
const Turma = require('./turma');

const Avaliacao = sequelize.define('Avaliacao', {
  id_avaliacao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numero_avaliacao: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  data_avaliacao: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Avaliacao.belongsTo(Turma)

module.exports = Avaliacao;