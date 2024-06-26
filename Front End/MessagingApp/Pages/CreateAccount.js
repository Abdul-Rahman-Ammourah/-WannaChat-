import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import checkPassword from '../ValidationChecks/PassCheck';
import checkEmail from '../ValidationChecks/EmailCheck';
import checkUsername from '../ValidationChecks/UsernameCheck';
import checkAge from '../ValidationChecks/AgeCheck';
import CustomButton1 from '../CustomFunctions/CustomButton1';

const CreateAccount = ({navigation}) => {
    const [stats, setStats] = React.useState({
        showUser: false,
        showPassDetails: false,
        showmailDetails: false,
        showuserDetails: false,
        passChecks: {
            length: false,
            number: false,
            specialChar: false,
            uppercase: false
        },
        emailvalid: true,
        usernamevalid: true,
        agevalid: true,
        userValid:true,
    });
    const [user, setUser] = React.useState({
        email: '',
        username: '',
        age: '',
        password: '',
        Id: 0
    });
    
    const handleSignInPress = () => {
        // Password Check
        const passcheck = checkPassword(user.password);

        // Email Check
        const emailvalid = checkEmail(user.email);

        // Username Check
        const usernamevalid = checkUsername(user.username);

        // Age Check
        const agevalid = checkAge(user.age);

        
        // Validation Check and Update the statsS
        if (passcheck.isValid && emailvalid && usernamevalid && agevalid) {
            setStats({
                ...stats,
                passChecks: passcheck.checks,
                emailvalid: emailvalid,
                usernamevalid: usernamevalid,
                agevalid: agevalid,
                userValid:true
            });
            navigation.navigate('Contacts');
            alert('Valid email address or password ');
        } else {
            setStats({
                ...stats,
                passChecks: passcheck.checks,
                emailvalid: emailvalid,
                usernamevalid: usernamevalid,
                agevalid: agevalid,
                userValid:false
            });
            alert('Invalid email address or password ');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.modalOuter}>
                <View style={styles.modalInner}>
                    <Text style={styles.createAccountText}>CREATE YOUR ACCOUNT</Text>

                    <Text style={styles.modalText}>ENTER YOUR EMAIL</Text>

                    {stats.showmailDetails && <Text style={[styles.checkDetails, !stats.emailvalid && styles.invalid]}>Only gmail, yahoo, and hotmail are supported</Text>}

                    <TextInput
                        style={[styles.input, !stats.emailvalid && styles.invalidinput]}
                        placeholder='example@domain.com'
                        placeholderTextColor="#fff"
                        onFocus={() => setStats({ ...stats, showmailDetails: true })}
                        onBlur={() => setStats({ ...stats, showmailDetails: false })}
                        onChangeText={(text) => setUser({ ...user, email: text })}
                    />

                    <Text style={styles.modalText}>ENTER YOUR USER NAME</Text>
                    <TextInput
                        style={[styles.input, !stats.usernamevalid && styles.invalidinput]}
                        placeholder='username'
                        placeholderTextColor="#fff"
                        onChangeText={(text) => setUser({ ...user, username: text })}
                        maxLength={20}
                    />

                    <Text style={styles.modalText}>ENTER YOUR AGE</Text>
                    <TextInput
                        style={[styles.input, !stats.agevalid && styles.invalidinput]}
                        placeholder='age'
                        placeholderTextColor="#fff"
                        keyboardType='numeric'
                        onChangeText={(num) => setUser({ ...user, age: num })}
                        maxLength={3}
                    />

                    <Text style={styles.modalText}>ENTER YOUR PASSWORD</Text>

                    {stats.showPassDetails && <Text style={[styles.checkDetails, !stats.passChecks.length && styles.invalid]}>1) Must be at least 8 characters long</Text>}
                    {stats.showPassDetails && <Text style={[styles.checkDetails, !stats.passChecks.number && styles.invalid]}>2) Must contain at least one number</Text>}
                    {stats.showPassDetails && <Text style={[styles.checkDetails, !stats.passChecks.specialChar && styles.invalid]}>3) Must contain at least one special character</Text>}
                    {stats.showPassDetails && <Text style={[styles.checkDetails, !stats.passChecks.uppercase && styles.invalid]}>4) Must contain at least one uppercase letter</Text>}

                    <TextInput
                        style={[styles.input]}
                        placeholder='password'
                        placeholderTextColor="#fff"
                        secureTextEntry
                        onFocus={() => setStats({ ...stats, showPassDetails: true })}
                        onBlur={() => setStats({ ...stats, showPassDetails: false })}
                        onChangeText={(text) => setUser({ ...user, password: text } )}
                    />
                    {!stats.userValid && <Text style={styles.invalid}>Please Check your details</Text>}

                    <TouchableOpacity style={styles.button} onPress={handleSignInPress}>
                        <Text style={styles.buttonText}>CONTINUE</Text>
                    </TouchableOpacity>
                    <Text style={styles.footerText}>
                        BY SIGNING UP, YOU AGREE TO OUR TERMS OF SERVICE AND PRIVACY POLICY
                    </Text>

                    <C1Button text='Home' onPress={() => navigation.navigate('UnderCon')}></C1Button>
                    <C1Button text='Signup' onPress={() => navigation.navigate('Signup')}></C1Button>

                </View>
            </View>
        </View>
    )
}

export default CreateAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        animationType: 'slide',
    },
    modalOuter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    modalInner: {
        width: '100%',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    modalText: {
        fontSize: 14,
        marginBottom: 10,
        color: '#000',
    },
    checkDetails: {
        fontSize: 14,
        color: '#000',
    },
    invalid: {
        fontSize: 14,
        color: 'red',
        paddingBottom: 5,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#000',
        borderRadius: 30,
        paddingHorizontal: 10,
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    invalidinput: {
        width: '100%',
        height: 50,
        backgroundColor: '#000',
        borderRadius: 30,
        borderWidth: 3,
        borderColor: 'red',
        paddingHorizontal: 10,
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',

    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,1) 100%)',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',

    },
    createAccountText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#000',
    },
    footerText: {
        fontSize: 12,
        textAlign: 'center',
        color: '#666',
        marginTop: 20,
    },
});
