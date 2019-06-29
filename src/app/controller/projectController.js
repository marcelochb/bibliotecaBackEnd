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
        console.log('entrou')
        const livro = await Livros.find();
        return res.send({ livro });
    } catch (err) {
        return res.status(400).send({ Error: 'Erro listando livros' })
    }


})

/**
 * Lista todos os Livros para ser avaliados
 */
router.get('/livrosnotas', async (req, res) => {
    try {
        /**
         *  Este find() tras os livros avaliados pelo usuarios
         */
        const _livros = await Notas.find({ user: req.userId }).select('livro');
        console.log(_livros)

        /**
         *  aqui eu separa apenas o _id dos livros avaliados pelo usuario
         */
        const livrosAvaliados = _livros.map(x => { return x.livro });
        console.log(livrosAvaliados)
        /**
         * Este find() busca os livros que ainda nao foram avaliados
         */
        const livros = await Livros.find(
            {
                "_id": {
                    "$not": {
                        "$in": livrosAvaliados
                    }
                }
            }
        );
        console.log(livros)
        return res.send({ livros });
    } catch (err) {
        return res.status(400).send({ Error: 'Erro listando livros' })
    }


})



/**
 * Lista apenas 1 livro
 */
router.get('livrosId', async (req, res) => {
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
        return res.status(400).send({ Error: 'Erro criando livro' })
    }

})

/**
 * Apaga o livro
 */
router.delete('/livros/:livrosId', async (req, res) => {
    try {
        /**
         * Verifico se o livro ja foi avaliado e nao pode excluir
         */
        if (await Notas.find({ livro: req.params.livrosId })) {
            return res.status(200).send({ Error: 'O livro foi avaliado e não pode ser apagado' })
        }
        await Livros.findByIdAndRemove(req.params.livrosId);
        return res.send();
    } catch (err) {
        return res.status(400).send({ Error: 'Erro ao deletar' });
    }
})

/**
 * Lista todos as notas
 */
router.get('/notas', async (req, res) => {
    try {
        const notas = await Notas.find({ user: req.userId })
            .populate('livro');

        return res.send({ notas });
    } catch (err) {
        return res.status(400).send({ Error: 'Erro listando notas' })
    }


})


/**
 * Lista de livros e media de avaliações
 */
router.get('/notasmedia', async (req, res) => {
    try {
        const livrosAvaliados = await Notas.distinct('livro');
        const livros = await Livros.find(
            {
                "_id": {
                    "$in": livrosAvaliados
                }
            }
        );
        const notas = await Notas.find();
        const result = {
            livros: livros,
            notas: notas
        };

        // for (let i = 0; i < livros.length; i++) {
        //     const teste = livros[i]._id;
        //     console.log(teste.titulo);
        //     for (let x = 0; x < notas.length; x++) {
        //         if (livros[i]._id === notas[x].livro) {
        //             console.log(teste);
        //         }

        //     }

        // }

        return res.send({ result });
    } catch (err) {
        return res.status(400).send({ Error: 'Erro listando notas' })
    }


})

// router.get('/notamedia/:livroId', async (req, res) => {
//     try {
//         const total = await Notas.find({ livro: req.params.livroId }).count();
//         console.log('total' + total)
//         const soma = await Notas.find({ livro: req.params.livroId });

//         const teste = soma.distinct('nota')


//         //soma = soma.sum(x => x.nota);
//         console.log(soma)
//         //const media = (soma / total);
//         console.log(media)
//         return res.send({ media })


//     } catch (error) {
//         return res.status(400).send({ Error: 'Erro listando notas' })

//     }

// })



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
        const notas = await Notas.create({ nota: req.body.nota, user: req.userId, livro: req.body.livroId });
        return res.send({ notas });
    } catch (err) {
        return res.status(400).send({ Error: 'Erro atribuindo uma nota ao livro' })
    }

})


router.delete('/notas/:notasId', async (req, res) => {
    try {
        await Notas.findByIdAndRemove(req.params.notasId);
        return res.send();
    } catch (err) {
        return res.status(400).send({ Error: 'Erro ao deletar' });
    }
})



module.exports = app => app.use('/projects', router);