const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const Curso = require('./model/curso')
const Turma = require('./model/turma')
const Professor = require('./model/professor')
const Avaliacao = require('./model/avaliacao')
const Avaliacao_Nota = require('./model/avaliacao_nota')
const Aluno = require('./model/aluno')

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


// Criar a tabela de pets se ela não existi

// Criar tabela de cursos e inserir dados
/*db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS cursos (id INTEGER PRIMARY KEY, nome TEXT, id_professor INT)");

    const cursos = [
        ['Gestão Pessoal', 1],
        ['Educação do Futuro', 2],
        ['Curso de HTML e CSS3', 1],
        ['Curso de HTML e CSS2', 3],
        ['Curso de HTML e CSS1', 3]
    ];

    const insertCurso = db.prepare("INSERT INTO cursos (nome, id_professor) VALUES (?, ?)");
    cursos.forEach(curso => {
        insertCurso.run(curso);
    });
    insertCurso.finalize();

    // Selecionar todos os cursos
    // db.all("SELECT * FROM cursos", (err, rows) => {
    //     if (err) {
    //         console.error(err.message);
    //     } else {
    //        console.log("Cursos disponíveis:");
    //        rows.forEach(row => {
    //            console.log(${row.id} - ${row.nome});
    //        });
    //    }
    // });



    // Selecionar um curso específico (exemplo: Curso de HTML e CSS3)
    /*db.get("SELECT * FROM cursos WHERE nome = ?", ['Curso de HTML e CSS3'], (err, row) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("\nInformações sobre Curso de HTML e CSS3:");
            console.log(${row.id} - ${row.nome});
        }
    });
});

app.use(express.json());

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(filePath);
})

// Listar todos os pets
app.get('/cursos', (req, res) => {
	db.all('SELECT * FROM cursos', (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({ pets: rows });
	});
});

// Obter informações de um pet específico
app.get('/cursos/:id', (req, res) => {
	const { id } = req.params;
	db.get('SELECT * FROM cursos WHERE id = ?', [id], (err, row) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		if (!row) {
			res.status(404).json({ error: 'Course not found' });
			return;
		}
		res.json({ pet: row });
	});
});

// Adicionar um novo pet
app.post('/cursos', (req, res) => {
	const { nome, id_professor } = req.body;
	db.run('INSERT INTO cursos (nome, id_professor) VALUES (?, ?)', [nome, id_professor], function (err) {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({ pet_id: this.lastID });
	});
});

// Atualizar informações de um pet
app.put('/cursos/:id', (req, res) => {
	const { id } = req.params;
	const { nome, id_professor } = req.body;
	db.run('UPDATE cursos SET nome = ?, id_professor = ? WHERE id = ?', [nome, id_professor, id], (err) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({ message: 'Course updated successfully' });
	});
});

// Deletar um pet
app.delete('/cursos/:id', (req, res) => {
	const { id } = req.params;
	db.run('DELETE FROM cursos WHERE id = ?', [id], (err) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({ message: 'Course deleted successfully' });
	});
});*/

// Iniciar o servidor
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});