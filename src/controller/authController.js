const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

function generationToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}


// Rota para registra o usuario
router.post('/register', async (req, res) => {
    const { email } = req.body;
    try {
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'Já existe este usuário!' })
        }

        const user = await User.create(req.body);

        user.senha = undefined;

        return res.send({
            user,
            token: generationToken({ id: user.id }),
        });

    } catch (err) {
        return res.status(400).send({ error: 'Falha no registro' });
    }

});

router.post('/authenticate', async (req, res) => {
    const { email, senha } = req.body;

    const user = await User.findOne({ email }).select('+senha');

    if (!user) {
        return res.status(400).send({ error: 'Usuário não encontrado!' });
    }

    if (!await bcrypt.compare(senha, user.senha)) {
        return res.status(400).send({ error: 'Senha Invalida' });
    }

    user.sena = undefined;

    const token =

        res.send({
            user,
            token: generationToken({ id: user.id }),
        });

});



module.exports = app => app.use('/auth', router);