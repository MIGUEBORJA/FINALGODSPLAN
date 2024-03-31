export const validateName = (name) => {
    return /^[a-zA-Z\s]{10,40}$/.test(name);
};

export const validateEmail = (email) => {
    return /^[A-Za-z0-9._%+-]+@(gmail\.com|hotmail\.com)$/.test(email);
};

export const validateSubject = (subject) => {
    return subject.trim().length > 0;
};

export const validateMessage = (message) => {
    return message.trim().length > 0;
};
