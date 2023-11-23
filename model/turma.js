const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importe a instância do Sequelize configurada
const Curso = require('./curso');

const Turma = sequelize.define('Turma', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sala: {
    type: DataTypes.STRING,
    allowNull: false
  },
  qtd_max: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

Turma.belongsTo(Curso)

module.exports = Turma;