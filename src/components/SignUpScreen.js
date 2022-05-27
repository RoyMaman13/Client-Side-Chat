import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import { serverPath } from '../serverPath.js'


const SignUp = (props) => {

    async function postRegister(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return (response.status === 200) ? response.json() : null;
    }

    const nevigate = useNavigate();
    let inUsername = null;
    let inPassword = null;
    let inVerifyPassword = null;
    let inNickname = null;
    let inPicture = null;

    const isUsernameValide = (inUsername) => {
        if (inUsername === null || inUsername === "" || inUsername.length < 2)
            return false;
        else
            return true;
    }

    const isPasswordValide = (inPassword) => {
        if (inPassword === "" || inPassword === null) {
            return false;
        } else {
            return true;
        }
    }
    const isPasswordEquals = (inPassword, verifyPassword) => {
        return (inPassword === verifyPassword);
    }

    const isNicknameValid = (inNickname) => {
        return !(inNickname === "" || inNickname === null);
    }


    const submitHendler = async (event) => {
        event.preventDefault();
        //Username validation.
        inUsername = document.getElementById("email").value;
        if (!isUsernameValide(inUsername)) {
            alert("Invalide Username !");
            return;
        }
        //Password validation.
        inPassword = document.getElementById("password").value;
        if (!isPasswordValide(inPassword)) {
            alert("Invalid Password !");
            return;
        }
        //verify password==verifyPassword.
        inVerifyPassword = document.getElementById("verifyPassword").value;
        if (!isPasswordEquals(inPassword, inVerifyPassword)) {
            alert("Passwords not equals !");
            return;
        }
        //Nickname validation.
        inNickname = document.getElementById("nickname").value;
        if (!isNicknameValid(inNickname)) {
            alert("Invalide Nickname !");
            return;
        }

        var registerUser = await postRegister('https://' + serverPath + '/Register',
            { Id: inUsername, Password: inPassword, Nickname: inNickname });

        if (registerUser == null)
            alert("Invalid username or password !")
        else {
            props.setConnectedUsername(registerUser.id);
            nevigate("/chat-screen");
        }
    }

    return (
        <div className="outer">
            <div className="inner">
                <Form onSubmit={submitHendler}>
                    <h3>Sign Up</h3>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>@</InputGroup.Text>
                        <FormControl id="email" aria-required={true} placeholder="Username" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl id="password" type="password" placeholder="Enter password" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl id="verifyPassword" type="password" placeholder="Verify password" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FormControl id="nickname" type="text" placeholder="Nickname" />
                    </InputGroup>
                    <Button type="submit" className="btn btn-dark btn-lg btn-block">Register</Button>
                </Form>
            </div>
        </div>
    );
}

export default SignUp;