const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Conectar ao banco de dados SQLite (pode ser necessário criar o arquivo pets.db primeiro)
const db = new sqlite3.Database('./cursos.db');

// Criar a tabela de pets se ela não existi

// Criar tabela de cursos e inserir dados
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS cursos (id INTEGER PRIMARY KEY, nome TEXT)");

    const cursos = [
        'Gestão Pessoal',
        'Educação do Futuro',
        'Curso de HTML e CSS3',
        'Curso de HTML e CSS2',
        'Curso de HTML e CSS1'
    ];

    const insertCurso = db.prepare("INSERT INTO cursos (nome) VALUES (?)");
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
    });*/
});

app.use(express.json());

app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'views', 'index.html');
    res.sendFile(filePath);
})

// Listar todos os pets
app.get('/pets', (req, res) => {
	db.all('SELECT * FROM pets', (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({ pets: rows });
	});
});

// Obter informações de um pet específico
app.get('/pets/:id', (req, res) => {
	const { id } = req.params;
	db.get('SELECT * FROM pets WHERE id = ?', [id], (err, row) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		if (!row) {
			res.status(404).json({ error: 'Pet not found' });
			return;
		}
		res.json({ pet: row });
	});
});

// Adicionar um novo pet
app.post('/pets', (req, res) => {
	const { name, species } = req.body;
	db.run('INSERT INTO pets (name, species) VALUES (?, ?)', [name, species], function (err) {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({ pet_id: this.lastID });
	});
});

// Atualizar informações de um pet
app.put('/pets/:id', (req, res) => {
	const { id } = req.params;
	const { name, species } = req.body;
	db.run('UPDATE pets SET name = ?, species = ? WHERE id = ?', [name, species, id], (err) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({ message: 'Pet updated successfully' });
	});
});

// Deletar um pet
app.delete('/pets/:id', (req, res) => {
	const { id } = req.params;
	db.run('DELETE FROM pets WHERE id = ?', [id], (err) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({ message: 'Pet deleted successfully' });
	});
});

// Iniciar o servidor
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});