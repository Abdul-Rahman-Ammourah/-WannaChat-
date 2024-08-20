import RSA from 'react-native-rsa-native';
import * as Keychain from 'react-native-keychain';
import CryptoJS from 'crypto-js';
class End2End {
  // 1. Generate RSA Key Pair
  static async generateKey() {
    try {
      const keyPair = await RSA.generateKeys(2048); // 2048-bit RSA keys
      await Keychain.setGenericPassword('privateKey', keyPair.private); // Store private key securely
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
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        const decryptedMessage = await RSA.decrypt(encryptedMessage, privateKey);
        return decryptedMessage;
      } else {
        throw new Error('Private key not found');
      }
    } catch (error) {
      console.error('Decryption error:', error);
      throw error;
    }
  }

  // 4. Sign Message with the user's private key
  static async signMessage(message) {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        const signature = await RSA.sign(message, credentials.password, RSA.SHA256);
        return signature;
      } else {
        throw new Error('Private key not found');
      }
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

  // 6. Store Private Key Securely
  static async storePrivateKey(privateKey) {
    try {
      await Keychain.setGenericPassword('privateKey', privateKey);
    } catch (error) {
      console.error('Error storing private key:', error);
      throw error;
    }
  }

  // 7. Retrieve Private Key from Secure Storage
  static async retrievePrivateKey() {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        return credentials.password;
      } else {
        throw new Error('Private key not found');
      }
    } catch (error) {
      console.error('Error retrieving private key:', error);
      throw error;
    }
  }

  // 8. Encrypt the Private key
  static encryptPrivateKey = (privateKey, password) => {
    const encryptedKey = CryptoJS.AES.encrypt(privateKey, password).toString();
    return encryptedKey;
  };

  // 9. Decrypt the Private key
  static decryptPrivateKey = (encryptedKey, password) => {
    const decryptedKey = CryptoJS.AES.decrypt(encryptedKey, password).toString(CryptoJS.enc.Utf8);
    return decryptedKey;
  };
}

export default End2End;
