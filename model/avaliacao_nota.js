const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importe a instância do Sequelize configurada
const Avaliacao = require('./avaliacao');
const Aluno = require('./aluno')

const Avaliacao_Nota = sequelize.define('Avaliacao_nota', {
    id_avaliacao_nota: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nota: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Avaliacao_Nota.belongsTo(Avaliacao)
Avaliacao_Nota.belongsTo(Aluno)

module.exports = Avaliacao_Nota;