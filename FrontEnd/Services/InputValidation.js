export function LoginValidation(email, password) {
    const normalizedEmail = email ? email.toLowerCase() : ""; // Ensure email is not undefined or null
    const emailValid = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo)\.com$/.test(normalizedEmail);
    const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    return emailValid && passwordValid;
}

export function EmailCheck(email) {
    const normalizedEmail = email ? email.toLowerCase() : ""; // Ensure email is not undefined or null
    return /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo)\.com$/.test(normalizedEmail);
}

export function UsernameCheck(username) {
    const userV = /^(?=.{3,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/.test(username);
    console.log(userV);
    return userV;
}

export function RegisterValidation(email, username, password) {
    const normalizedEmail = email ? email.toLowerCase() : ""; // Ensure email is not undefined or null
    const emailV = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo)\.com$/.test(normalizedEmail);

    const userV = /^(?=.{3,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/.test(username);

    const passwordV = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    return { emailV, userV, passwordV };
}
