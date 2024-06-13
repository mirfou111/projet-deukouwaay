import React, { useState } from 'react'
import "../styles/Register.scss"

export const RegisterPage = () => {
    const [formData, setFormData] = useState({
        prenom: "",
        nom: "",
        email:"",
        mdp:"",
        confirmeMdp:"",
        profileImage: null
    })

    const handleChange = (e)=>{
        const {name, value, files} = e.target
        setFormData({
            ...formData,
            [name]: value,
            [name]: name === "profileImage" ? files[0] : value
        })
    }

    console.log(formData)
    return (
        <div className='register'>
            <div className="register_content">
                <form className='register_content_form'>
                    <input 
                        placeholder='Prenom'
                        name='prenom'
                        value={formData.prenom}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        placeholder='Nom'
                        name='nom'
                        value={formData.nom}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        placeholder='Email'
                        name='email'
                        type='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        placeholder='Mot de passe'
                        name='mdp'
                        type='password'
                        value={formData.mdp}
                        onChange={handleChange}
                        required
                    /> 
                    <input 
                        placeholder='Confirmer le mot de passe'
                        name='confirmerMdp'
                        type='password'
                        value={formData.confirmeMdp}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        type="file" 
                        id='image'
                        name="profileImage" 
                        accept='image/*' 
                        onChange={handleChange}
                        required 
                        style={{display: "none"}}
                    />
                    <label htmlFor='image'>
                        <img src="/assets/addImage.png" alt="Add profile photo"/>
                        <p>Charger votre photo de profil</p>
                    </label>
                    {formData.profileImage && (
                        <img 
                            src={URL.createObjectURL(formData.profileImage)}
                            alt='photo profile'
                            style={{
                                maxWidth: "100px"
                            }}
                        />
                    )}
                    <button type="submit">S'inscrire</button>
                </form>
                <a href="/login">Deja inscrit ?</a>
            </div>
        </div>
  ) 
}
