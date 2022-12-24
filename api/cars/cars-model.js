const db = require(`../../data/db-config`)

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

const update = async (id, car) => {
  await db('cars').update(car).where('car_id', id)
  const updatedCar = await getById(id)
  return updatedCar
}

const removeById = async (id) => {
  const deletedCar = await getById(id)
  await db('cars').del().where('car_id', id)
  return deletedCar
}


module.exports = {
  getAll,
  getById,
  create,
  update,
  removeById
}
