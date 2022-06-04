const express = require('express');
const uuid = require('uuid');

const app = express();
app.use(express.json());

let users = [];

app.get('/users', (req, res) =>{
    return res.json(users);
});

app.post('/users', (req, res) =>{
    const newUser = req.body;
    newUser.id = uuid.v4();
    users.push(newUser);
    return res.json(newUser);
});

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const dadosUser = req.body;

    const userToChange = users.find(user => user.id === id);

    userToChange.name = dadosUser.name ? dadosUser.name : userToChange.name;
    userToChange.age = dadosUser.age ? dadosUser.age : userToChange.age;
    userToChange.email = dadosUser.email ? dadosUser.email : userToChange.email;

    const newList = users.filter(user => user.id !== id);

    newList.push(userToChange);
    users = newList;

    return res.json(userToChange);
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    
    const newList = users.filter(user => user.id !== id);

    users = newList;

    return res.json({message: 'User Has Been Sucessfully Deleted'})
});

app.listen(3333, (error) => {
    if (error){
        console.error(error);
    }
    console.info('Server runinng on Port 3333');
});