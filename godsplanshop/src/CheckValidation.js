export const validateEmail = (email) => {
  return /^[A-Za-z0-9._%+-]+@(gmail\.com|hotmail\.com)$/.test(email);
};

export const validateSubject = (subject) => {
  return subject.trim().length > 0;
};

export const validateMessage = (message) => {
  return message.trim().length > 0;
};

export const validateUsername = (username) => {
  return /^[a-zA-Z\s]{10,40}$/.test(username);
};

export const validateRole = (role) => {
  return /^(admin|user)$/.test(role);
};

export const validatePostalCode = (postalCode) => {
  return /^\d{6}$/.test(postalCode);
};

export const validatePhoneNumber = (phoneNumber) => {
  return /^\d{10}$/.test(phoneNumber);
};
export const validateDocumentID = (documentID) => {
  return /^\d{8,11}$/.test(documentID);
};

export const validateName = (name) => {
  return /^[a-zA-Z\s]{10,40}$/.test(name);
};

export const validatePassword = (password) => {
  if (password.length < 6) {
    return false;
  }
  const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
  if (!specialChars.test(password)) {
    return false;
  }

  if (password.includes("123")) {
    return false;
  }

  return true;
};


export const validateDescription = (description) => {
  return description.trim().length > 10;
};

export const validatePrice = (price) => {
  return /^[1-9]\d{4,}(\.\d{2})?$/.test(price);
};

export const validateTitle = (title) => {
  return /^[a-zA-Z\s]{3,40}$/.test(title);
};