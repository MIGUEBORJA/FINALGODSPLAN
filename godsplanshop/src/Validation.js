export default function Validation(values) {
    const errors = {}

    const username_pattern = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/
    const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(values.username === ''){
        errors.username = 'El nombre de usuario es obligatorio';
    }else if (!username_pattern.test(values.username)) {
        errors.email = "Tú nombre solo puede contener letras";
    }
    if(values.email === ''){
        errors.email = 'El email es obligatorio';
    } else if (!email_pattern.test(values.email)) {
        errors.email = "Tú email debe contener @ y continuar con .";
    }

    if(values.password === ''){
        errors.password = 'La contraseña es obligatoria';
    } else if (!password_pattern.test(values.password)) {
        errors.password = "Necesitas mínimo 8 caracteres entre ellos un número y uno especial (@'/$!)";
    }

    if(values.contact === ''){
        errors.contact = 'El numero de contacto es obligatorio';
    }

    return errors; 
}