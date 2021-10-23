const controller = require('../controllers/products.controllers')

module.exports = function (app) {
  app.post('/api/products', controller.addProduct)
  app.get('/api/products', controller.getProducts)
  app.get('/api/products/:id', controller.getProduct)
  app.delete('/api/products/:id', controller.deleteProduct)
  app.put('/api/products/:id', controller.updateProduct)
}
