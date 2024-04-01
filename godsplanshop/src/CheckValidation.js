export const validateEmail = (email) => {
    return /^[A-Za-z0-9._%+-]+@(gmail\.com|hotmail\.com)$/.test(email);
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

  export const validateAddress = (address) => {
    return /^[A-Za-z]+\s+(Cll|Cr)\s+\d{7,15}[A-Za-z]$/.test(address);
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


  
  