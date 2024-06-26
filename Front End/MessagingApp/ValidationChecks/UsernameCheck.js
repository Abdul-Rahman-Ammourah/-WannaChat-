function checkUsername(username) {
  const usernamePattern = /^[a-zA-Z0-9_#-\s]{3,20}$/;
  return usernamePattern.test(username) && username.length >= 3;
}

export default checkUsername;
