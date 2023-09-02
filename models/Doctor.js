const mongoose = require("mongoose");
const schema = mongoose.Schema;

const doctorSchema = new schema({
    image: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true

    },
    specialité: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    téléphone: {
        type: Number,
        required: true
    },
    grade: {
        type: String,
        required: true

    },
    prix: {
        type: String,

    },
    region: {
        type: String,

    },
    avis: {
        type: Array,

    },


})

const Doctor = mongoose.model("Doctor", doctorSchema);


module.exports = Doctor;