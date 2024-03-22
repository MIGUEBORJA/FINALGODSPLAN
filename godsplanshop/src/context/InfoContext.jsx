import { createContext, useEffect, useState } from "react";

export const InfoContext = createContext(); 

export const CheckoutProvider = ({ children }) => {

  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem('checkoutInfo');
    return storedValue ? JSON.parse(storedValue) : { message: "Hello, world!" };
  });

  useEffect(() => {
    localStorage.setItem('checkoutInfo', JSON.stringify(value));
  }, [value]);

  
    return (
      <InfoContext.Provider
        value={{ value, setValue }}
      >
        {children}
      </InfoContext.Provider>
    );
  };
  
  