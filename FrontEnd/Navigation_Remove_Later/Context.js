import React, { createContext, useState } from 'react';

// Create the context
export const NavContext = createContext();

// Context provider component
export const NavProvider = ({ children }) => {
    //Context states
    const [senderEmail, setSenderEmail] = useState('');  // Add user email state
    const [receiverEmail, setReceiverEmail] = useState('');  // Add receiver email state
    const [publicKey, setPublicKey] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    return (
        <NavContext.Provider value={{ senderEmail, setSenderEmail,
                                      receiverEmail,setReceiverEmail,
                                      publicKey, setPublicKey,
                                      privateKey, setPrivateKey
                                      }}>
            {children}
        </NavContext.Provider>
    );
};
