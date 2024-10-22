const pool = require('../config/db');

// Cria um novo usuário
exports.createUser = async (req, res) => {
  const { name, document, email, birthday } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (name, document, email, birthday) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, document, email, birthday]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};

// Obtém todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter usuários' });
  }
};

// Obtém um usuário
exports.getOneUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao obter um usuário' });
  }
};

// Atualiza usuário
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, document, email, birthday } = req.body;

  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, document = $2, email = $3, birthday = $4 WHERE id = $5 RETURNING *',
      [name, document, email, birthday, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
};

// Deleta usuário
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao remover usuário' });
  }
};
