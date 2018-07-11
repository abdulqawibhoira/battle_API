module.exports = (req, res, next) => {
    res.set({
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, PATCH',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    });
    next()
}