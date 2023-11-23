const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importe a instância do Sequelize configurada
const Turma = require('./turma');

const Professor = sequelize.define('Professor', {
  id_professor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sobrenome: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Professor.belongsTo(Turma)

module.exports = Professor;