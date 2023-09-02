const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
    image: {
        required: false,
        type: String,
        default: "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    category: { type: String, default: "user" },
    verified: { type: Boolean, default: false }



})

module.exports = mongoose.model("User", UserSchema);
