var express = require("express");
var router = express.Router();
const mysql = require("mysql");
var app = express();

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "angelo",
    database: "angelo_db"
});

conexao.connect();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})


//Serve para visualizar as categorias

app.get("/", function (request, response) {
    conexao.query("SELECT * FROM categoria", function (error, rows) {
        if (error) {
            response.status(500).send(error);
        }
        response.status(200).send(rows);
    });
});

//Serve para visualizar uma categoria através do ID dela

app.get("/:id", function (request, response) {
    conexao.query(
        "SELECT * FROM categoria where id = " + parseInt(request.params.id),
        function (error, rows) {
            if (error) {
                response.status(500).send(error);
            }
            if (rows.length > 0) {
                response.status(200).send(rows);
            } else {
                response.status(404).send("Not Found");
            }
        });
});
// Serve para adicionar uma categoria

app.post("/", function (request, response) {
    conexao.query(
        "INSERT INTO categoria (descricao) values ('" +
        request.body.descricao +
        "')",
        function (error, rows) {
            if (error) {
                response.status(500).send(error);
            }
            response.status(201).send("Categoria adicionada com sucesso!");
        });
});

// Serve para editar uma categoria
app.put("/:id", function (request, response) {
    let sql = `UPDATE categoria
           SET descricao = ?
           WHERE id = ?`;
    let data = [request.body.descricao, parseInt(request.params.id)];

    conexao.query(sql, data, (error, results, fields) => {
        if (error) {
            response.status(500).send(error);
        }
        response.status(200).send("Categoria editada com sucesso!");
    });
});

// Serve para deletar uma categoria
app.delete("/:id", function (request, response) {
    conexao.query(
        "DELETE from categoria where id = " + parseInt(request.params.id),
        function (error, rows) {
            if (error) {
                response.status(500).send(error);
            }
            response.status(200).send("Categoria removida com sucesso!");
        });
});


module.exports = app;