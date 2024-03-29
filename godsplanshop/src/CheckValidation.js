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
    return /^[a-zA-Z\s]{1,40}$/.test(name);
  };

  export const validateAddress = (address) => {
    return /^[A-Za-z0-9][A-Za-z0-9]{1,3}$/.test(address);
};

  
  