function checkEmail(email) {
  // Updated regex to match only gmail, yahoo, and hotmail domains
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(gmail\.com|yahoo\.com|hotmail\.com)$/;

  if (emailRegex.test(email)) {
      return true; // Valid email
  } else {
      return false; // Invalid email
  }
}

export default checkEmail;
