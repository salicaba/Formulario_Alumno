const path = require('path');
const userModel = require('../models/userModel');

module.exports = {
    login: (req, res) => {
        const { username, password } = req.body;

        userModel.findUser(username, password, (results) => {
            if (results.length > 0) {
                req.session.user = results[0];
                res.redirect('/dashboard');
            } else {
                res.send('Usuario o contraseña incorrectos');
            }
        });
    },

    dashboard: (req, res) => {
        if (req.session.user) {
            res.sendFile(path.join(__dirname, '../views/dashboard.html'));
        } else {
            res.redirect('/');
        }
    }
};