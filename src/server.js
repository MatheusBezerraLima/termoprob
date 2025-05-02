import express from 'express';
import path from 'path'; // Importa a função join do módulo path
import { __dirname } from './utils/path.js';

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3333)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './public/html/formWord.html'));
})