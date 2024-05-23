const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    gender: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "สมาชิก"
    },
    profile: {
        type: String,
        default: "https://e1.pxfuel.com/desktop-wallpaper/940/647/desktop-wallpaper-the-best-16-default-pfp-aesthetic-kidcore-pfp-icon.jpg"
    }
}, { timestamps: true });


module.exports = mongoose.model("Users", UserSchema);