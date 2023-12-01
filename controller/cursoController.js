const Curso = require('../model/curso')
const express = require('express')
const verifyToken = require('../security/auth');

function cursoController() {

    const router = express.Router();
    // Método para buscar todos os cursos
    router.get('/', verifyToken, async(req, res) => {
      try {
        const cursos = await Curso.findAll();
        res.json(cursos);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    })
  
    // Método para criar um novo curso
    router.post('/',verifyToken, async(req, res) => {
      const { nome, descricao, duracao_semanas } = req.body;
      try {
        const novoCurso = await Curso.create({
          nome,
          descricao,
          duracao_semanas,
     // Aqui é onde você passa a chave estrangeira correspondente à relação com Turma
          // Se houverem outros campos, adicione-os aqui de acordo com seu modelo
        });
        res.status(201).json(novoCurso);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    })
  
    // Método para buscar um curso por ID
    router.get('/:id',verifyToken, async(req, res) => {
      const { id } = req.params;
      try {
        const curso = await Curso.findByPk(id);
        if (!curso) {
          return res.status(404).json({ message: 'Curso não encontrado' });
        }
        res.json(curso);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    })

    router.get('/f/:nome',verifyToken, async(req, res) => {
        const { nome } = req.params;
        try {
          const curso = await Curso.findAll(id);

          for(c in curso){
            if (c.nome = nome){
                return res.json(c)
            }
          }
        return res.status(404).json({ message: 'Curso não encontrado' });

        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      })
  
    // Método para atualizar um curso por ID
    router.put('/:id',verifyToken, async(req, res) => {
      const { id } = req.params;
      const { nome, descricao, duracao_semanas } = req.body;
      try {
        const curso = await Curso.findByPk(id);
        if (!curso) {
          return res.status(404).json({ message: 'Curso não encontrado' });
        }
        await curso.update({
          nome,
          descricao,
          duracao_semanas,
          // Se houverem outros campos para atualizar, adicione-os aqui de acordo com seu modelo
        });
        res.json(curso);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    })
  
    // Método para excluir um curso por ID
    router.delete('/:id', verifyToken, async(req, res) => {
      const { id } = req.params;
      try {
        const curso = await Curso.findByPk(id);
        if (!curso) {
          return res.status(404).json({ message: 'Curso não encontrado' });
        }
        await curso.destroy();
        res.json({ message: 'Curso excluído com sucesso' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    })
    return router;
  };

  module.exports = cursoController