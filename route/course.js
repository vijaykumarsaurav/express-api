const express = require('express');
const router = express.Router();

var courses = [
    { id: 1, name: "Course1" },
    { id: 2, name: "Course2" },
    { id: 3, name: "Course3" },
    { id: 4, name: "Course4" },
    { id: 5, name: "Course5" },
];

function validateObject(json) {
    //        age: Joi.number().min(5).required()
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(json, schema);
}

router.delete('/:id', (req, res) => {
    const genre = courses.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    const index = courses.indexOf(genre);
    courses.splice(index, 1);

    res.send(genre);
});

router.get('/', (req, res) => {
    res.send(courses);
})


router.put('/:id', (req, res) => {
    const genre = courses.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    const { error } = validateObject(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

router.post('/', (req, res) => {

    const { error } = validateObject(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);


    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course);
    res.send(course);
})


router.get('/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
        res.status(404).send("<h1 style='color:red'> Requested course not found <h1>")

    res.send(course);

})

/* app.get('/api/courses/:year/:month', (req, res) => {
    res.send(req.params);
})
 */
router.get('/:year/:month', (req, res) => {
    res.send(req.query);
})


module.exports = router;

