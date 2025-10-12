const express = require('express');
const morgan = require('morgan');
morgan.token('body',
    (req) => {
        if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
            return JSON.stringify(req.body);
        }
        return '';
    }
);

const app = express();
app.use(express.json());
app.use(express.static('dist'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let notes = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(notes);
})

app.get('/info', (req, res) => {
    const date = new Date();
    res.send(`<p>Phonebook has info for ${notes.length} people</p><p>${date}</p>`);
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const note = notes.find(note => note.id === id);
    if (note) {
        res.json(note);
    } else {
        res.status(404).end();
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    notes = notes.filter(note => note.id !== id);
    res.status(204).end();
})

app.post('/api/persons', express.json(), (req, res) => {
    const body = req.body;

    if (!body.name) {
        return res.status(400).json({ error: 'name is missing' });
    }

    if (!body.number) {
        return res.status(400).json({ error: 'number is missing' });
    }

    const nameExists = notes.find(note => note.name === body.name);
    if (nameExists) {
        return res.status(400).json({ error: 'name must be unique' });
    }

    const newNote = {
        id: (Math.random() * 10000).toFixed(0),
        name: body.name,
        number: body.number
    }

    notes = notes.concat(newNote);
    res.json(newNote);
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})