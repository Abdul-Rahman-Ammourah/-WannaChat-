import React, { createContext, useState } from 'react';

export const NavContext = createContext();

export const NavProvider = ({ children }) => {
    const [navState, setNavState] = useState({
        call: false,
        home: true,
        profile: false
    });

    const handleCall = () => setNavState({ call: true, home: false, profile: false });
    const handleHome = () => setNavState({ call: false, home: true, profile: false });
    const handleProfile = () => setNavState({ call: false, home: false, profile: true });

    return (
        <NavContext.Provider value={{ navState, handleCall, handleHome, handleProfile }}>
            {children}
        </NavContext.Provider>
    );
};
