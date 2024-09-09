import RSA from 'react-native-rsa-native';
import * as Keychain from 'react-native-keychain';
import CryptoJS from 'crypto-js';
class End2End {
  // 1. Generate RSA Key Pair
  static async generateKey() {
    try {
      const keyPair = await RSA.generateKeys(2048); // 2048-bit RSA keys
      return keyPair;
    } catch (error) {
      console.error('Key generation error:', error);
      throw error;
    }
  }

  // 2. Encrypt Message with recipient's public key
  static async encryptMessage(message, recipientPublicKey) {
    try {
      const encryptedMessage = await RSA.encrypt(message, recipientPublicKey);
      return encryptedMessage;
    } catch (error) {
      console.error('Encryption error:', error);
      throw error;
    }
  }

  // 3. Decrypt Message with the user's private key
  static async decryptMessage(encryptedMessage, privateKey) {
    try {
      const decryptedMessage = await RSA.decrypt(encryptedMessage, privateKey);
      return decryptedMessage;
    } catch (error) {
      console.error('Decryption error:', error);
      throw error;
    }
  }

  // 4. Sign Message with the user's private key
  static async signMessage(message) {
    try {
      const signature = await RSA.sign(message, credentials.password, RSA.SHA256);
      return signature;
    } catch (error) {
      console.error('Signing error:', error);
      throw error;
    }
  }

  // 5. Verify Message Signature with sender's public key
  static async verifyMessage(message, signature, senderPublicKey) {
    try {
      const isValid = await RSA.verify(message, signature, senderPublicKey, RSA.SHA256);
      return isValid;
    } catch (error) {
      console.error('Signature verification error:', error);
      throw error;
    }
  }

  // 6. Encrypt the Private key
  static encryptPrivateKey = (privateKey, password) => {
    const encryptedKey = CryptoJS.AES.encrypt(privateKey, password).toString();
    return encryptedKey;
  };

  // 7. Decrypt the Private key
  static decryptPrivateKey = (encryptedKey, password) => {
    const decryptedKey = CryptoJS.AES.decrypt(encryptedKey, password).toString(CryptoJS.enc.Utf8);
    return decryptedKey;
  };
}

export default End2End;
