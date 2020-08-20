const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

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
    res.json(database.users[0]);
  } else {
    res.status(400).json("error login in");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 8, (err, hash) => {
    console.log(hash);
  });

  if (name && email && password) {
    database.users.push({
      id: "1235",
      name: name,
      email: email,
      entries: 0,
      joined: new Date(),
    });
    res.json(database.users[database.users.length - 1]);
  } else {
    res.status(400).json("error in register");
  }
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    res.status(400).json("no such user");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json("not found");
  }
});

app.listen(3001, () => {
  console.log("Server running in port 3001");
});
