const express = require('express');
const router = express();



router.get('/', (req, res) => {
    res.render('index', { title: "My Express title", message: "This is dynamic message" })
    //    res.send("<b>Its root <br>!!!</b>");
})

module.exports = router;