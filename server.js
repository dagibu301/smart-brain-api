const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "John@gmail.com",
      password: "secret",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "1234",
      name: "Sally",
      email: "sally@gmail.com",
      password: "bananas",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("error login in");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    database.users.push({
      id: "1235",
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date(),
    });
    res.json(database.users[database.users.length - 1]);
  } else {
    res.status(400).json("error in register");
  }
});

app.listen(3000, () => {
  console.log("Server running in port 3000");
});
