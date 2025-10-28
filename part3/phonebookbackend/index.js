require('dotenv').config()
const express = require('express');
const Person = require('./models/Person');
const morgan = require('morgan');
morgan.token('body',
    (req) => {
        if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
            return JSON.stringify(req.body);
        }
        return '';
    }
);
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const app = express();
app.use(express.json());
app.use(express.static('dist'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// let notes = [
//     {
//         "id": "1",
//         "name": "Arto Hellas",
//         "number": "040-123456"
//     },
//     {
//         "id": "2",
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523"
//     },
//     {
//         "id": "3",
//         "name": "Dan Abramov",
//         "number": "12-43-234345"
//     },
//     {
//         "id": "4",
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122"
//     }
// ]

const mongodb_url = process.env.MONGODB_URL;
mongoose.connect(mongodb_url)
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons);
    }).catch(err => {
        console.error(err);
        res.status(500).end();
    })
    // res.json(notes);
})

app.get('/info', (req, res) => {
    Person.countDocuments({}).then(count => {
        const date = new Date();
        res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
    }).catch(err => {
        console.error(err);
        res.status(500).end();
    })
})

app.get('/api/persons/:id', (req, res) => {
    // const id = req.params.id;
    // const note = notes.find(note => note.id === id);
    // if (note) {
    //     res.json(note);
    // } else {
    //     res.status(404).end();
    // }
    Person.findById(req.params.id).then(person => {
        if (person) {
            res.json(person);
        } else {
            res.status(404).end();
        }
    }).catch(err => {
        console.error(err);
        res.status(500).end();
    })
})

app.delete('/api/persons/:id', (req, res) => {
    // const id = req.params.id;
    // notes = notes.filter(note => note.id !== id);
    // res.status(204).end();
    Person.findByIdAndDelete(req.params.id).then(() => {
        res.status(204).end();
    }).catch(err => {
        console.error(err);
        res.status(500).end();
    })
})

app.post('/api/persons', express.json(), (req, res) => {
    const body = req.body;

    if (!body.name) {
        return res.status(400).json({ error: 'name is missing' });
    }

    if (!body.number) {
        return res.status(400).json({ error: 'number is missing' });
    }

    // const nameExists = notes.find(note => note.name === body.name);
    // if (nameExists) {
    //     return res.status(400).json({ error: 'name must be unique' });
    // }
    Person.findOne({ name: body.name }).then(existingPerson => {
        if (existingPerson) {
            return res.status(400).json({ error: 'name must be unique' });
        }
    })

    // const newNote = {
    //     id: (Math.random() * 10000).toFixed(0),
    //     name: body.name,
    //     number: body.number
    // }
    //
    // notes = notes.concat(newNote);
    // res.json(newNote);
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson => {
        res.json(savedPerson);
    }).catch(err => {
        console.error(err);
        res.status(500).end();
    })
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})