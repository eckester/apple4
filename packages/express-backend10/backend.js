// backend.js
import cors from "cors";
import express from "express";
const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
const findUserByName = (name) => {
    return users['users_list']
        .filter( (user) => user['name'] === name);
}
app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});
const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});
const addUser = (user) => {
    users['users_list'].push(user);
    return user;
}
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userToAdd.id = (String)(genID());
    addUser(userToAdd);
    res.status(201).send(userToAdd);
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    const userToDel = users['users_list'].findIndex(p => p.id == id);
    if (userToDel == -1){
        return res.status(404).send();
    } else {
        users['users_list'].splice(userToDel, 1);
        res.status(204).send();
    }

    users['users_list'].splice(userToDel, 1);
    res.status(204).send();
});

const genID = () => {
    while (true){
        const id = Math.floor(Math.random() * 1000);
        if (findUserById(id) === undefined){
            return id;
        }
    }
}
const users = {
    users_list : [
        {
            id : 'xyz789',
            name : 'Charlie',
            job: 'Janitor',
        },
        {
            id : 'abc123',
            name: 'Mac',
            job: 'Bouncer',
        },
        {
            id : 'ppp222',
            name: 'Mac',
            job: 'Professor',
        },
        {
            id: 'yat999',
            name: 'Dee',
            job: 'Aspring actress',
        },
        {
            id: 'zap555',
            name: 'Dennis',
            job: 'Bartender',
        }
    ]
}