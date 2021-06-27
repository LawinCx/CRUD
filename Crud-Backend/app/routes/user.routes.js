module.exports = app => {
    const users = require('../controllers/user.controller')

    var router = require('express').Router()

    // Create
    router.post('/', users.create)

    // Retrieve
    router.get('/', users.findAll)

    // Edit
    router.put('/:id', users.update)

    // Delete
    router.delete('/:id', users.delete)

    app.use('/api/users', router)
}