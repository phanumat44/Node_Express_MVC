const bcrypt = require('bcryptjs');
const Users = require('../Models/Users');
const jwt = require('jsonwebtoken');

exports.Register = async (req, res) => {
    const { username, email, gender, password, role, profile } = req.body;
    try {
        let user = await Users.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        let salt_round = parseInt(process.env.SALT_ROUNDS)

        bcrypt.genSalt(salt_round, (err, salt) => {
            bcrypt.hash(password, salt, (err, hashedPassword) => {

                if (err) {
                    throw err;
                }
                user = new Users({
                    username,
                    gender,
                    email,
                    password: hashedPassword,
                    role,
                    profile
                });
                user.save();
                res.send("User registered");
            });
        });


    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Error Occurred while registering user");
    }
}


exports.Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await Users
            .findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                throw err;
            }
            if (isMatch) {
                const payload = {
                    user: {
                        id: user.id,
                        user: user
                    }
                };
                jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: "10h"
                }, (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.json({ message: "Login Successfully", payload, token });
                });
            }
            else {
                return res.status(400).json({ message: "Invalid credentials" });
            }
        });


    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

exports.Update = async (req, res) => {
    const {
        username,
        gender,
        email,
        password,
        role,
        profile
    } = req.body;

    Users.findByIdAndUpdate(req.params.id, {
        username,
        gender,
        email,
        password,
        role,
        profile
    }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.send({ status: "ok", message: "User updated!", users: user });
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.id
            });
        });
};

exports.Remove = async (req, res) => {
    Users.findByIdAndDelete(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.send({ status: "ok", message: "User deleted!" });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error deleting user with id " + req.params.id
            });
        });
};

exports.Readall = async (req, res) => {
    Users.find()
        .then(users => {
            res.send({ status: "ok", users: users });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving users."
            });
        });
}

exports.Readone = async (req, res) => {
    Users.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            res.send({ status: "ok", users: user });
        })
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.id
            });
        });
};