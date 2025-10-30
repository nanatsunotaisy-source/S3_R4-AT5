const express = require ("express");
const app = express();
const PORT = 8081;
const fs = require("fs");
const pathFile = "./livros.json"
app.use (express.json());

app.post("/livros", (req, res)=>{
    try {
        const {titulo, autor, ano, estoque} = req.body;

         const livro = {
            titulo: titulo,
            autor: autor,
            ano: ano,
            estoque: estoque
         };

         const data = fs.readFileSync(pathFile, "utf-8");
         const livros = JSON.parse(data);

         livros.push(livro);

         fs.writeFileSync(pathFile, JSON.stringify(livros, null, 4));

         res.status(201).json({message: "livro cadastrado com sucesso"});

    } catch (error) {
        console.error("erro ao cadastrar livro:",error);
        res.status(500).json({error: "erro interno no servidor ao cadastrar livro!"});
    }
});

app.get("/consultarLivro", (req, res)=>{
    try {
        const data = fs.readFileSync(pathFile, "utf-8");
        
        let livros = JSON.parse(data);

        res.status(200).json(livros);
    } catch (error) {
        console.error("erro ao exibir livros:",error);
        res.status(500).json({error: "erro interno no servidor ao exibir os livro!"});
    }
});

app.get("/filtrarLivros", (req, res)=>{
    try {
         const data = fs.readFileSync(pathFile, "utf-8");
        
        let livros = JSON.parse(data);

        const {pesquise} = req.query;

        if(pesquise){
            livros = livros.filter(livro => livro.titulo.toLowerCase().includes(pesquise.toLowerCase()));
        }

        res.status(200).json(livros);
    } catch (error) {
        console.error("erro ao filtar livros:",error);
        res.status(500).json({error: "erro interno no servidor ao filtrar os livro!"});
    }
});

app.listen(PORT, ()=>{
console.log(`Servidor rodando em http://localhost:${PORT}`);
});