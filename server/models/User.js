const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        prenom:{
            type: String,
            required: true
        },
        nom:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },
        mdp:{
            type: String,
            required: true
        },
        profileImgPath:{
            type: String,
            default: ""
        },
        listDeVoyage:{
            type: Array,
            default: []
        },
        listSouhait:{
            type: Array,
            default: []
        },
        listPropriete:{
            type: Array,
            default: []
        },
        listReservation:{
            type: Array,
            default: []
        }
    },
    { timestamps : true}
)
const User = mongoose.model("User" , UserSchema)

module.exports = User;