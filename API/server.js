const express = require('express');
const server = express();
const cors = require('cors');
const port = 8080;

server.use(express.json());
server.use(cors());

const {Sequelize, DataTypes, where} = require('sequelize');

// Setting witch table its gonna connect, user, password, settings.
const sequelize = new Sequelize('test', 'root', 'root', {
    host: "localhost",
    dialect: "mysql",
})

sequelize.authenticate()
.then(res => {console.log("Connected")})
.catch(err => {console.log("Err: ", err)});

// Creating table
const Users = sequelize.define(
    'users',
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        createdAt: false,
        updatedAt: false,
    }
)


server.get("/users", async (req, res) => {
    const users = await Users.findAll();
    res.json(users)
})

server.post("/users", (req, res) => {
    const {firstName, lastName} = req.body;
    Users.create({firstName, lastName})
    .then(res => console.log("Successfully user created"))
    .catch(err => console.log("err:", err));
    res.json({"UserCreated?": true});
})

server.delete('/users', (req, res) => {
    const {id} = req.body;
    Users.destroy({
        where: {id}
    })
    .then(res => console.log("User deleted"))
    .catch(err => console.log("Er", err));
})

server.patch('/users/:id', (req, res) => {
    const id = req.params.id;
    const {firstName, lastName} = req.body;

    Users.update(
        {firstName, lastName},
        {where: {id}}
    )
    .then(res => console.log("User updated"))
    .catch(err => console.log("Error: ", err));

    res.json({"Update": "Done"});
})

server.listen(port, async () => {
    await sequelize.sync();
    console.log("listening port: ", port)
})