import React, { createContext, useState } from 'react';

export const NavContext = createContext();

export const NavProvider = ({ children }) => {

    const [senderEmail, setSenderEmail] = useState('');  
    const [conID, setConID] = useState('');//ConnectionID of the receiver
    const [receiverEmail, setReceiverEmail] = useState('');  

    const [publicKey, setPublicKey] = useState('');//for encryption
    const [privateKey, setPrivateKey] = useState('');//for decryption

    const [ChatUsername, setChatUsername] = useState('');

    const [Username, setUsername] = useState('');
    return (
        <NavContext.Provider value={{ senderEmail, setSenderEmail,
                                      receiverEmail,setReceiverEmail,
                                      publicKey, setPublicKey,
                                      privateKey, setPrivateKey,
                                      ChatUsername, setChatUsername,
                                      Username, setUsername,
                                      conID, setConID
                                      }}>
            {children}
        </NavContext.Provider>
    );
};
