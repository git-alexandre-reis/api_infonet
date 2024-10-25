//require('dotenv').config()

const express = require('express');
const app = express();
const useRoutes = require('./routes/users')
const cors = require('cors'); // Importando o middleware cors

app.use(cors()); // Habilita CORS para todas as rotas

app.use(express.json())

app.use('/api/users', useRoutes)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})