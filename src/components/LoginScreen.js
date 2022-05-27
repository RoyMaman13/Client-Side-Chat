import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { serverPath } from '../serverPath.js'


const Login = (props) => {

    async function postLogin(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return (response.status == 200) ? response.json() : null;
        // return response.json(); // parses JSON response into native JavaScript objects
    }

    const nevigate = useNavigate();

    const submitHendler = async (event) => {
        event.preventDefault();
        var inputUsername = document.getElementById("email").value;
        var inputPassword = document.getElementById("password").value;
        var loggedUser = await postLogin('https://' + serverPath + '/Login', { Id: inputUsername, Password: inputPassword });
        if (loggedUser == null)
            alert("Invalid username or password !")
        else {
            props.setConnectedUsername(loggedUser.id);
            nevigate("/chat-screen");
        }
    }

    return (
        <div className="outer">
            <div className="inner">
                <h3>Log in</h3>
                <Form onSubmit={submitHendler}>
                    <InputGroup className="mb-4" >
                        <InputGroup.Text >@</InputGroup.Text>
                        <FormControl
                            id="email"
                            placeholder="Username"
                        />
                    </InputGroup>
                    <InputGroup className="mb-4" >
                        <FormControl
                            id="password"
                            placeholder="Password"
                            type="password" />
                    </InputGroup>
                    <Button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</Button>
                </Form>
            </div>
        </div >
    );
}

export default Login