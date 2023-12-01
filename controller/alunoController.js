const express = require('express');
const Aluno = require('../model/aluno'); // Importe o modelo Aluno do seu arquivo models
const verifyToken = require('../security/auth');

// Lembrando que em todas as rotas tem o controle por token de autenticação JWT (Json Web Token)
// Função para controle de rotas do alunos
function alunoController() {
  const router = express.Router();

  // Obter todos os alunos
  router.get('/', verifyToken, async (req, res) => {
    try {
      const alunos = await Aluno.findAll();
      res.json(alunos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Criar um novo aluno
  router.post('/', async (req, res) => {
    // Lembrando que essa constante está pegando os dados pela requisição do Body
    const { nome, sobrenome, data_nasc, cpf, login, senha } = req.body;
    try {
      const novoAluno = await Aluno.create({ nome, sobrenome, data_nasc, cpf, login, senha });
      res.status(201).json(novoAluno);
      // Se tiver algum erro, vai retornar 400 e mandar a mensagem do erro.
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Obter informações de um aluno específico
  // Semelhando ao GetID, mas no caso você vai usar a matrícula
  router.get('/:matricula', verifyToken, async (req, res) => {
    const { matricula } = req.params;
    try {
      // findByPk vai filtrar o campo pela PK
      const aluno = await Aluno.findByPk(matricula);
      if (!aluno) {
        res.status(404).json({ error: 'Aluno não encontrado' });
      } else {
        res.json(aluno);
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Atualizar informações de um aluno
  router.put('/:matricula', verifyToken , async (req, res) => {
    const { matricula } = req.params;
    const { nome, sobrenome, data_nasc, cpf } = req.body;
    try {
      const aluno = await Aluno.findByPk(matricula);
      if (!aluno) {
        res.status(404).json({ error: 'Aluno não encontrado' });
      } else {
        await aluno.update({ nome, sobrenome, data_nasc, cpf });
        res.json(aluno);
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Excluir um aluno
  router.delete('/:matricula',verifyToken , async (req, res) => {
    const { matricula } = req.params;
    try {
      const aluno = await Aluno.findByPk(matricula);
      // Se não encontrar o aluno, vai retornar 404 not found
      if (!aluno) {
        res.status(404).json({ error: 'Aluno não encontrado' });
      } else {
        await aluno.destroy();
        res.status(204).end();
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}

module.exports = alunoController;