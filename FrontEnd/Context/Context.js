import React, { createContext, useEffect, useState } from 'react';
import AsyncStorageUtil from '../Services/AsyncStorage';
export const NavContext = createContext();
//Might Delete Later
import UserPic from "../Assets/ProfilePicSet/ProfileSet2.jpg";
import TargetPic from "../Assets/ProfilePicSet/ProfileSet.jpg";
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
export const NavProvider = ({ children }) => {
    //Target
    const [ChatUsername, setChatUsername] = useState('');
    const [conID, setConID] = useState('');//ConnectionID of the receiver
    const [receiverEmail, setReceiverEmail] = useState('');  
    const [publicKey, setPublicKey] = useState('');//for encryption
    const [targetProfilePic, setTargetProfilePic] = useState(TargetPic);

    //User
    const [Username, setUsername] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [privateKey, setPrivateKey] = useState('');//for decryption
    const [userProfilePic, setUserProfilePic] = useState(UserPic);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <NavContext.Provider value={{ senderEmail, setSenderEmail,
                                      receiverEmail,setReceiverEmail,
                                      publicKey, setPublicKey,
                                      privateKey, setPrivateKey,
                                      ChatUsername, setChatUsername,
                                      Username, setUsername,
                                      conID, setConID,
                                      targetProfilePic, setTargetProfilePic,
                                      userProfilePic, setUserProfilePic,
                                      isLoggedIn, setIsLoggedIn
                                      }}>
            {children}
        </NavContext.Provider>
    );
};

