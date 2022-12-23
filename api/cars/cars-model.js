const knex = require('knex')

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './data/dealer.db3'
  },
  useNullasDefault: true
})

const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  return db('cars').where('car_id', id).first()
}

const create = async (car) => {
  const id = await db('cars').insert(car)
  return getById(id)
}

module.exports = {
  getAll,
  getById,
  create
}
