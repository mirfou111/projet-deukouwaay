const express = require('express')
const router = express.Router()
const bcrypt = require ('bcryptjs')
const jwt = require('jsonwebtoken')
const multer = require('multer')

const User = require('../models/User.js')

//Configuration de "multer" pour l'upload de fichier
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads") //
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) //
    }
})

const upload = multer({storage})

//Registration
router.post("/register", upload.single('profileImage'), async (req, res)=>{
    try {
        //On prend toute les information depuis le formulaire
        const {prenom, nom, email, mdp} = req.body
        //On recupere le fichier image dispo via req.file
        const profileImage = req.file

        if (!profileImage) {
            res.status(400).send("Aucun fichier choisi !")
        }

        //Chemin vers l'image 
        const profileImgPath = profileImage.path

        //On verifie si l'utilisateur n'existe pas deja
        const existingUser = await User.findOne({email})
        if (existingUser) {
            res.status(409).json({message : "Cet email est deja utilise !"})
        }

        //On hashe le mot de passe 
        const salt = await bcrypt.genSalt()
        const hashedPwd = await bcrypt.hash(mdp, salt)
        
        //Et maintenant on peut creer l'utilisateur 
        const newUser = new User ({
            prenom,
            nom,
            email,
            mdp: hashedPwd,
            profileImgPath
        })
        //On enregistre l'uitlisateur dans la base de donnees
        await newUser.save()
         res.status(201).json({ message : "Utilisateur ajoute avec succes", user : newUser})
         console.log(`Utilisateur cree : ${newUser.nom}`);
    } catch (error) {
        res.status(500).json({message : "La creation de compte a echoue !", err: error.message})
        console.log(`Erreur : ${error}`);
    }
})

module.exports = router