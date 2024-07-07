import React from "react";

const EmailVali = (mail) => {
    const Regix = /^[^\s@]+@(gmail\.com|hotmail\.com|yahoo\.com)$/;
    return Regix.test(mail)
}
export const PasswordVali = (pass) => {
    const requirements = {
      length: {
        test: pass.length >= 9,
        message: "Password must be more than 8 characters long.",
      },
      capital: {
        test: /[A-Z]/.test(pass),
        message: "Password must contain at least one capital letter.",
      },
      special: {
        test: /[!@#$%^&*]/.test(pass),
        message: "Password must contain at least one special character.",
      },
    };
  
    const isValid = Object.values(requirements).every(req => req.test);
    const messages = Object.values(requirements)
      .filter(req => !req.test)
      .map(req => req.message);
  
    return { isValid, messages };
  };
  
const UsernameVali = (nameI) => {
    const Regix = /^[a-zA-Z0-9_-]{3,16}$/
    return Regix.test(nameI)
}
export default function InputValidation (props) {
    const {mail,pass,nameI} = props

}
