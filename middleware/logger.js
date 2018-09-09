function logger(req, res, next) {

    console.log('Logging...')
    next();
}

function authonticate(req, res, next) {

    console.log('Authonticate...')
//    res.send('Authonticate sent this')
    next();

}

module.exports.authonticate = authonticate;
module.exports.logger = logger;