const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importe a instância do Sequelize configurada
const Curso = require('./curso');
const Turma = require('./turma');
const { v4: uuidv4 } = require('uuid');

const Aluno = sequelize.define('Aluno', {
  matricula: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: () => uuidv4()
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  sobrenome: {
    type: DataTypes.STRING,
    allowNull: true
  },
  data_nasc: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Aluno.belongsTo(Curso)
Aluno.belongsTo(Turma)

module.exports = Aluno;