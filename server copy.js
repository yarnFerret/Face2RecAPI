const express = require('express');


const app = express();

app.use(express.json());

const database = {
  users: [
    {
      id:'123',
      name: 'John',
      email: 'john@gmail.com',
      password: '1234',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Basia',
      email: 'basia@gmail.com',
      password: 'dupa',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req,res) =>{
  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password){
    res.json('success');
  }else{
    res.status(400).json('error logging in')
  }
})

app.post('/register', (req, res) =>{
  const {email, name, password} = req.body;
  database.users.push(
    {
      id: '125',
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date()
    }
  )
  res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req,res) => {
  const {id} = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id){
      found = true;
      return res.json(user);
    } 
  })
  if(!found) {
    res.status(404).json('no user found');
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries ++;
      return res.json(user.entries);
    }
  })
  if (!found) {
    res.status(400).json('no user found');
  }
})


app.listen(3000, () => {
  console.log('app is running on port :3000')
})

/*
/signin --> POST = success/fail
/register --> POST = user (new user)
/profile/:userId --> GET = user
/image --> PUT --> user (updated)

*/