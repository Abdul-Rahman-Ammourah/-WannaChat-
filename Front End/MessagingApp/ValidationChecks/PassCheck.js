function checkPassword(password) {
    const checks = {
      length: password.length >= 8,
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      uppercase: /[A-Z]/.test(password)
    };
  
    return {
      isValid: checks.length && checks.number && checks.specialChar && checks.uppercase,
      checks
    };
}

export default checkPassword;
  