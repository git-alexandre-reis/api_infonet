const { Pool } = require('pg');

// Configurando o pool com a variável de ambiente e SSL habilitado
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Usando a variável DATABASE_URL do Neon
  ssl: {
    rejectUnauthorized: false, // Necessário para o Neon, permite SSL sem verificação do certificado
  },
});

module.exports = pool;