const controller = require('../controllers/products.controller')
const { userMiddleware } = require('../middlewares/user.middleware')

module.exports = function (app) {
  app.get('/api/products', controller.getProducts)
  app.get('/api/products/:id', controller.getProduct)
  app.post('/api/products', userMiddleware, controller.addProduct)
  app.put('/api/products/:id', userMiddleware, controller.updateProduct)
  app.delete('/api/products/:id', userMiddleware, controller.deleteProduct)
}
