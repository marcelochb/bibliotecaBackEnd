module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader){
        return res.status(401).send({error: 'Token não informado'});
    }

    const parts = authHeader.split(' ');

    if (!parts.length == 2) {
        return res.status(401).send({error: 'Erro no Token'});
    }

    const [ scheme, token ] = parts;

    if(!/ˆBearer$/i.test(scheme))

    next();
}