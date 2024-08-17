import React, { createContext, useState } from 'react';

// Create the context
export const NavContext = createContext();

// Context provider component
export const NavProvider = ({ children }) => {
    const [navState, setNavState] = useState({
        call: false,
        home: true,
        profile: false
    });

    const [senderEmail, setSenderEmail] = useState('');  // Add user email state
    const [receiverEmail, setReceiverEmail] = useState('');  // Add receiver email state
    const handleCall = () => setNavState({ call: true, home: false, profile: false });
    const handleHome = () => setNavState({ call: false, home: true, profile: false });
    const handleProfile = () => setNavState({ call: false, home: false, profile: true });

    return (
        <NavContext.Provider value={{ navState, handleCall, handleHome, handleProfile,
                                      senderEmail, setSenderEmail,
                                      receiverEmail,setReceiverEmail,
                                      }}>
            {children}
        </NavContext.Provider>
    );
};
