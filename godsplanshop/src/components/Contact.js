import React, { useState } from 'react'
import '../contact.css'
import { validateEmail, validateSubject, validateMessage, validateName } from '../CheckValidation';
import Swal from 'sweetalert2';


const Contact = () => {
    const [user, setUser] = useState({
        Name: '',
        Email: '',
        Subject: '',
        Message: ''
    });

    const data = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const sendData = async (e) => {
        e.preventDefault();
        const { Name, Email, Subject, Message } = user;

        if (!validateName(Name)) {
            //alert
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "warning",
                title: "Ingrese un nombre válido sin números ni caracteres especiales"
            });
        }

        if (!validateEmail(Email)) {
            //alert
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "warning",
                title: "Ingrese un correo eléctronico válido"
            });
        }

        if (!validateSubject(Subject)) {
            //alert
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "warning",
                title: "Ingrese un asunto válido"
            });

        }

        if (!validateMessage(Message)) {
            //alert
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "warning",
                title: "Ingrese un mensaje válido"
            });
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name,
                Email,
                Subject,
                Message
            })
        };

        try {
            const res = await fetch('https://e-commerce-contact-341bd-default-rtdb.firebaseio.com/Message.json', options);
            if (res.ok) {
                //alert
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Enviado exitosamente!"
                });
            } else {
                alert('Ocurrió un error al enviar la petición.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al enviar la petición.');
        }
    };

    return (
        <div className='contact_container'>
            <div className='contact'>
                <h2># Contactanos</h2>
                <div className='form'>
                    <form method='POST'>
                        <input type='text' name='Name' value={user.Name} placeholder='Ingresa tu Nombre completo' required autoComplete='off' onChange={data} maxLength={40} ></input>
                        <input type='email' name='Email' value={user.Email} placeholder='Ingresa tu E-mail' required autoComplete='off' onChange={data} maxLength={100}></input>
                        <input type='text' name='Subject' value={user.Subject} placeholder='Ingresa el asunto' required autoComplete='off' onChange={data} maxLength={100}></input>
                        <textarea name='Message' value={user.Message} placeholder='Ingresa el motivo de tu mensaje' required autoComplete='off' onChange={data} maxLength={100}></textarea>
                        <button type='submit' onClick={sendData}>Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;