// Login Validation block
export function LoginValidation(email, password) {
    const emailValid = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo)\.com$/.test(email);
    const passwordValid = /^(?=.{3,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(password);
    return emailValid && passwordValid;
}

export function RegisterValidation(email, username, password) {
    const emailV = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|yahoo)\.com$/.test(email);

    // Updated username validation regex
    const userV = /^(?=.{3,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username);

    const passwordV = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    return { emailV, userV, passwordV };
}