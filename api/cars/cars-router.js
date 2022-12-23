const { checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid } = require('./cars-middleware')
const Cars = require('./cars-model')
const router = require('express').Router()


router.get('/', async (req, res) => {
   try {
      const cars = await Cars.getAll()
      res.json(cars)
   } catch (err) {
      res.status(err.status).json({ message: `Could not get all cars` })
   }
})

router.get(`/:id`, checkCarId, async (req, res) => {
   try {
      const car = await Cars.getById(req.params.id)
      res.json(car)
   }
   catch (err) {
      res.status(err.status).json({ message: `Could not get the car by id ${req.params.id}` })
   }
})

router.post('/', [checkCarPayload, checkVinNumberUnique, checkVinNumberValid], async (req, res) => {
   try {
      const addCar = await Cars.create(req.body)
      res.status(201).json(addCar)
   }
   catch (err) {
      res.status(err.status).json({ message: `Something is missing from the payload or the vin does not exist/is already being used.` })
   }
})

module.exports = router