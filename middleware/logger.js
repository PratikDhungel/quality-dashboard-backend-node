//@Desc:        Logs requst to console
const logger = (req, res, next) => {
    console.log('Middleware ran');
    console.log(`${req.method}  ${req.protocol}://${req.get('host')}${req.originalUrl}`)
    next();
}

module.exports = logger;

