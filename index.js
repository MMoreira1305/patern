const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const alunoController = require('./controller/alunoController');
const cursoController = require('./controller/cursoController');
const loginController = require('./controller/loginController');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Conectar ao banco de dados SQLite (pode ser necessário criar o arquivo pets.db primeiro)
const db = new sqlite3.Database('./cursos.db');

const sequelize = require('./config/db');

sequelize.sync()
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso!');
    // Aqui você pode iniciar o servidor ou realizar outras operações da sua aplicação
  })
  .catch((err) => {
    console.error('Erro ao sincronizar tabelas:', err);
  });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Usando as rotas do controlador de alunos no arquivo index.js
const alunosRouter = alunoController(); // Obtenha as rotas do controlador
app.use('/alunos', alunosRouter);

const cursoRouter = cursoController();
app.use('/curso', cursoRouter)

const loginRouter = loginController();
app.use('/login', loginRouter)

// Iniciar o servidor
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});