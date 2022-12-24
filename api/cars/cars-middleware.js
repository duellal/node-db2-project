const db = require('../../data/db-config')
const Cars = require('./cars-model')
const vinValidate = require(`vin-validator`)


const checkCarId = async (req, res, next) => {
  const car = await Cars.getById(req.params.id)

  if (!car) {
    next({
      status: 404,
      message: `car with id ${req.params.id} is not found`
    })
  }
  return next()
}

const checkCarPayload = (req, res, next) => {
  let { vin, make, model, mileage } = req.body

  if (!vin) {
    next({
      status: 400,
      message: `vin is missing`
    })
  } else if (!make) {
    next({
      status: 400,
      message: `make is missing`
    })
  } else if (!model) {
    next({
      status: 400,
      message: `model is missing`
    })
  } else if (!mileage) {
    next({
      status: 400,
      message: `mileage is missing`
    })
  }

  next()
}

const checkVinNumberValid = (req, res, next) => {
  const vinValid = vinValidate.validate(req.body.vin)

  if (!vinValid) {
    next({
      status: 400,
      message: `vin ${req.body.vin} is invalid`
    })
  }
  next()
}

const checkVinNumberUnique = async (req, res, next) => {
  const vinExist = await db('cars').where('vin', req.body.vin)

  if (vinExist[0]) {
    next({
      status: 400,
      message: `vin ${req.body.vin} already exists`
    })
  }
  next()
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}
