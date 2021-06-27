const db = require('../models')
const User = db.users;

// Create
exports.create = (req, res) => {
    // Validation
    if(!req.body.username) {
        res.status(400).send({ message:'Username required' })
        return
    }

    // Create new user
    const user = new User({
        username: req.body.username,
        ci: req.body.ci,
        cellphone: req.body.cellphone,
        mail: req.body.mail
    })

    // Save in database
    user
        .save(user)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send({ message: err.message || 'Something happened while the user was created' }) })
}

// Retrieve ALL the users from the database
exports.findAll = (req, res) => {
    const username = req.query.username
    var condition = username ? { username: { $regex: new RegExp(username), $options: 'i' } } : {}

    User.find(condition)
        .then(data => { res.send(data) })
        .catch(err => { res.status(500).send({ message: err.message || 'Something went wrong trying to find de User' }) })
}

// Retrieve ONE user from the database
exports.findOne = (req, res) => {
    const id = req.params.id

    User.findById(id)
        .then(data => {
            if(!data) {
                res.status(404).send({ message: 'Not found the User with id=' + id })
            } else res.send(data)
        })
        .catch(err => { res.status(500).send({ message: 'Error retrieving User with id=' + id }) })
}

// Edit
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({ message: 'The edit cannot be empty' })
    }

    const id = req.params.id

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if(!data) {
            res.status(404).send({ message: `Cannot be edit the user with id=${id}` })
        } else res.send({ message: 'User was update successfully' })
    })
    .catch(err => { res.status(500).send({ message: 'Error updating the User with the id=' + id  }) })
}

// Delete
exports.delete = (req, res) => {
    const id = req.params.id

    User.findByIdAndRemove(id)
        .then(data => {
            if(!data) {
                res.status(404).send({ message: `Cannot delete the user with id=${id}` })
            } else {
                res.send({ message: 'User was deleted Successfully' })
            }
        })
        .catch(err => { res.status(500).send({ message: 'Error deleting the User with the id' + id }) })
}