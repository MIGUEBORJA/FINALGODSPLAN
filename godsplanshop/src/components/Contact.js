import React, { useState } from 'react'
import '../contact.css'

const Contact = () => {
    const [user, setUser] = useState(
        {
            Name:'', Email:'', Subject:'', Message:''
        }
    )
    let name, value
    const data = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]: value})
    }
    const ssenddata = async (e) => 
    {
        const{Name, Email, Subject, Message} = user
        e.preventDefault(); 
        const options = {
            method: 'POST',
            headers: {
                'Content-Type' : 'aplication/json'
            },
            body: JSON.stringify({
                Name, Email, Subject, Message
            })
        } 
        const res = await fetch('https://e-commerce-contact-341bd-default-rtdb.firebaseio.com/Message.json',  options )
        console.log(res)
        if(res)
        {
            alert("Tu petición ha sido enviada")
        }
        else
        {
            alert("An error ocurred")
        }
    }
  return (
    <>
    <div className='contact_container'>
        <div className='contact'>
            <h2># Contactanos</h2>
            <div className='form'>
                <form method='POST'>
                    <input type='text' name='Name' value={user.Name} placeholder='Ingresa tu Nombre completo' required  autoComplete='off' onChange={data}></input>
                    <input type='email' name='Email' value={user.Email} placeholder='Ingresa tu E-mail' required autoComplete='off' onChange={data}></input>
                    <input type='text' name='Subject' value={user.Subject} placeholder='Enter your subject' required autoComplete='off' onChange={data}></input>
                    <textarea name='Message' value={user.Message} placeholder='Ingresa el motivo de tú mensaje' required autoComplete='off' onChange={data}></textarea>
                    <button type='submit' onClick={ssenddata}>Enviar</button>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Contact
