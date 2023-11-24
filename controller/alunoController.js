const express = require('express');
const Aluno = require('../model/aluno'); // Importe o modelo Aluno do seu arquivo models

function alunoController() {
  const router = express.Router();

  // Obter todos os alunos
  router.get('/', async (req, res) => {
    try {
      const alunos = await Aluno.findAll();
      res.json(alunos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Criar um novo aluno
  router.post('/', async (req, res) => {
    const { nome, sobrenome, data_nasc, cpf } = req.body;
    try {
      const novoAluno = await Aluno.create({ nome, sobrenome, data_nasc, cpf });
      res.status(201).json(novoAluno);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Obter informações de um aluno específico
  router.get('/:matricula', async (req, res) => {
    const { matricula } = req.params;
    try {
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
  router.put('/:matricula', async (req, res) => {
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
  router.delete('/:matricula', async (req, res) => {
    const { matricula } = req.params;
    try {
      const aluno = await Aluno.findByPk(matricula);
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