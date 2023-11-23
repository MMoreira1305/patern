const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importe a instância do Sequelize configurada

const Curso = sequelize.define('Curso', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  duracao_semanas: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

module.exports = Curso;