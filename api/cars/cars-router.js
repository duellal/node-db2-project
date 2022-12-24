const Cars = require('./cars-model')
const router = require('express').Router()
const { checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid } = require('./cars-middleware')


router.get('/', async (req, res) => {
   try {
      const cars = await Cars.getAll()
      res.json(cars)
   } catch (err) {
      res.status(400).json({ message: `Could not get all cars` })
   }
})

router.get(`/:id`, checkCarId, async (req, res) => {
   try {
      const car = await Cars.getById(req.params.id)
      res.json(car)
   }
   catch (err) {
      res.status(400).json({ message: `Could not get the car by id ${req.params.id}.` })
   }
})

router.post('/', [checkCarPayload, checkVinNumberValid, checkVinNumberUnique], (req, res) => {
   Cars.create(req.body)
      .then(newCar => {
         res.status(201).json(newCar)

      })
      .catch(err => {
         res.status(400).json({ message: `Car could not be created` })
      })
})

router.put(`/:id`, [checkCarId], (req, res) => {
   Cars.update(req.params.id, req.body)
      .then(updateCar => {
         res.status(200).json(updateCar)
      })
      .catch(err => {
         res.status(404).json({ message: `Could not update id ${req.params.id}` })
      })
})

router.delete(`/:id`, checkCarId, (req, res) => {
   Cars.removeById(req.params.id)
      .then(car => {
         res.status(200).json(car)
      })
      .catch(err => {
         res.status(404).json({ message: `Could not delete id ${req.params.id}` })
      })
})

router.use((err, req, res, next) => {
   res.status(err.status || 500).json({
      message: err.message || `internal server error`
   })
})

module.exports = router