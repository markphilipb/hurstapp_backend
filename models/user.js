const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    //THis is where the user will login
    //For Now we will be inserting test data
    // name: String,
    email: String,
    // username: String,
    isAdmin: Boolean,
    auth0_id: String

    // name: { type: String, required: true },
    // email: {
    //     type: String, required: true, unique: true, index: true, dropDups: true,
    // },
    // password: { type: String, required: true },
    // isAdmin: { type: Boolean, required: true, default: false },
    // auth0_id: {type: String }
});

module.exports = mongoose.model('User', user);