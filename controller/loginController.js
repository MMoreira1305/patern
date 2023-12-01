const express = require('express')
const aluno = require('../model/aluno')
const jwt = require('jsonwebtoken');

function loginController(){
    const router = express.Router()

    router.post('/', async (req, res) => {
        const { login, senha } = req.body;
      
        // Verifique as credenciais do usuário (por exemplo, consulte no banco de dados)
        const user = await aluno.findOne({ where: { login } });
      
        // Verifique se o usuário existe e as senhas correspondem
        if (!user || user.senha != senha) {
          return res.status(401).json({ message: 'Credenciais inválidas' });
        }
      
        // Se as credenciais estiverem corretas, crie um token JWT
        const token = jwt.sign({ id: user.id }, 'seuSegredoDoToken', { expiresIn: '1h' });
      
        // Envie o token como resposta
        res.json({ token });
      });

    return router;
    
}

module.exports = loginController;