// Arquivo de configuração do banco de dados (config/db.js)
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './cursos.db' // Especifique o caminho e o nome do arquivo do banco de dados
});

// Verifique a conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados SQLite estabelecida com sucesso.');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados SQLite:', err);
  });

module.exports = sequelize;