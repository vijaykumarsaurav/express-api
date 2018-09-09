const appDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const config = require('config')
const express = require("express");
const Joi = require("joi");

const morgan = require("morgan");

const logger = require('./middleware/logger');
const router =  require('./route/course.js')
const homeroute = require('./route/home.js')

const app = express();

console.log(`configration name: `+ config.get('name'));
console.log(`configration mail host: ` + config.get('mail.host'));
console.log(`configration mail password: ` + config.get('mail.password'));

//console.log(`Enviroment : ${process.env.NODE_ENV}`)
console.log(`Enviroment : ${app.get('env')}`)
if (app.get('env') === 'development'){
    app.use(morgan('combined'))
   // console.log('morgen is enabled')
    appDebugger('morgen is enabled')
}

//db logging 
dbDebugger('Database connected ...')
app.use(logger.logger);
app.use(logger.authonticate);
app.use(express.static('public'));
app.use(express.urlencoded({ extended : true}));
/* app.use(function (req, res, next) {

    console.log('next Logging...')
    next();
}); */

const path = require('path');
app.set('view engine', 'pug');
app.set('views', './views'); //defalut 
//app.set('views', path.join(__dirname, '/public'));
//app.set('views', './public');


app.use(express.json());
app.use('/api/courses', router);
app.use('/', homeroute);


const port = process.env.PORT || 3000;
app.listen(port, ()=>{

    console.log(`listening on ${port}...`)
})