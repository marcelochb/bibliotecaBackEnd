const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Livros = require('../models/Livros');
const Notas = require('../models/Notas');
const User = require('../models/User');

const router = express.Router();

router.use(authMiddleware);



router.get('/user', async (req, res) => {
    try {
        const user = await User.find();
        return res.send({ user });
    } catch (err) {
        return res.status(400).send({ Error: 'Erro listando usuarios' })
    }


})



/**
 * Lista todos os Livros
 */
router.get('/livros', async (req, res) => {
    try {
        const livro = await Livros.find();
        return res.send({ livro });
    } catch (err) {
        return res.status(400).send({ Error: 'Erro listando livros' })
    }


})


/**
 * Lista apenas 1 livro
 */
router.get('/:livrosId', async (req, res) => {
    res.send({ user: req.userId });

})

/**
 * Cadastra um novo Livro
 */
router.post('/livros', async (req, res) => {
    const { titulo } = req.body;
    try {
        if (await Livros.findOne({ titulo })) {
            return res.status(400).send({ Error: 'Já existe um livro com este titulo!' })
        }
        const livro = await Livros.create({ ...req.body, user: req.userId });
        return res.send({ livro });
    } catch (err) {
        console.log(err)
        return res.status(400).send({ Error: 'Erro criando livro' })
    }

})


router.delete('/:livrosId', async (req, res) => {
    res.send({ user: req.userId });

})

/**
 * Lista todos as notas
 */
router.get('/notas', async (req, res) => {
    try {
        const notas = await Notas.find().populate('User');
        return res.send({ notas });
    } catch (err) {
        return res.status(400).send({ Error: 'Erro listando notas' })
    }


})


/**
 * Lista apenas 1 nota
 */
router.get('/:notasId', async (req, res) => {
    res.send({ user: req.userId });

})

/**
 * Atribuindo uma nota ao livro
 */
router.post('/notas', async (req, res) => {
    try {
        const notas = await Notas.create({ ...req.body, user: req.userId });
        return res.send({ notas });
    } catch (err) {
        return res.status(400).send({ Error: 'Erro atribuindo uma nota ao livro' })
    }

})


router.delete('/:notasId', async (req, res) => {
    res.send({ user: req.userId });

})



module.exports = app => app.use('/projects', router);