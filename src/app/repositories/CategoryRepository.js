const db = require('../../database');

class CategoryRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy === 'ASC' ? 'ASC' : 'DESC';
    const rows = await db.query(`SELECT * FROM categories ORDER BY name ${direction}`);

    return rows;
  }

  async create(name) {
    const [row] = await db.query(`
      INSERT INTO categories(name)
      VALUES($1)
      RETURNING *
    `, [name]);

    return row;
  }

  async findByName(name) {
    const [category] = await db.query('SELECT * FROM categories WHERE name = $1', [name]);

    return category;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM categories WHERE id = $1', [id]);

    return row;
  }

  async update(id, name) {
    const [row] = await db.query(`
      UPDATE categories
      SET name = $1
      WHERE id = $2
    `, [name, id]);

    return row;
  }

  async delete(id) {
    const deletedCategory = await db.query('DELETE FROM categories WHERE id = $1', [id]);

    return deletedCategory;
  }
}

module.exports = new CategoryRepository();
