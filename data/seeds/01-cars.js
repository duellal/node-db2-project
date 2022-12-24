exports.seed = async function (knex) {
   await knex('cars').truncate()
   await knex('cars').insert([
      { vin: "11111111111111111", make: 'Subaru', model: 'Outback', mileage: 42080 },
      { vin: "87945170983785192", make: 'Chevrolet', model: 'Equinox', mileage: 426624 },
      { vin: "94285080958317583", make: 'Toyota', model: 'Prius', mileage: 1489 }
   ])
}