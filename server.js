const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const database = {
    users: [
        {
            id:'123',
            name: 'John',
            email: 'John@gmail.com',
            password: 'secret',
            entries: 0,
            joined: new Date()
        },
        {
            id:'1234',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get("/", (req, res) => {
  res.send("This is working");
});

app.post("/signin", (req, res) => {
  if(req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
    ){
        res.json('success')    ;
  } else {
      res.status(400).json('error login in')
  }
});

app.listen(3000, () => {
  console.log("Server running in port 3000");
});