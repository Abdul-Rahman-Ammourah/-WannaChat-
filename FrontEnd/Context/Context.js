import React, { createContext, useState } from 'react';

export const NavContext = createContext();

export const NavProvider = ({ children }) => {

    const [senderEmail, setSenderEmail] = useState('');  
    
    const [receiverEmail, setReceiverEmail] = useState('');  

    const [publicKey, setPublicKey] = useState('');
    const [privateKey, setPrivateKey] = useState('');

    const [ChatUsername, setChatUsername] = useState('');

    const [Username, setUsername] = useState('');
    return (
        <NavContext.Provider value={{ senderEmail, setSenderEmail,
                                      receiverEmail,setReceiverEmail,
                                      publicKey, setPublicKey,
                                      privateKey, setPrivateKey,
                                      ChatUsername, setChatUsername,
                                      Username, setUsername
                                      }}>
            {children}
        </NavContext.Provider>
    );
};
