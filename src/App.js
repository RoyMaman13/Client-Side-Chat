import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Routes, Link, Route} from "react-router-dom";
import SignUp from "./components/SignUpScreen";
import Login from "./components/LoginScreen";
import ChatScreen from "./components/ChatScreen";
import {useState} from 'react';
import {data} from './data';

function App() {
    const [connectedUsername, setConnectedUsername] = useState(null);
    const [updateData, setData] = useState(data);


    return (
        <BrowserRouter>
            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <span className="navbar-brand">ChatApp!</span>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            {
                                (connectedUsername === "" || connectedUsername === null) ?
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                                        </li>
                                    </ul>
                                    :
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link onClick={() => setConnectedUsername(null)} className="nav-link"
                                                  to={"/"}>Sign out</Link>
                                        </li>
                                    </ul>
                            }
                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route exact path='/' element={<Login setConnectedUsername={setConnectedUsername}/>}/>
                    <Route exact path="/sign-in" element={<Login setConnectedUsername={setConnectedUsername}/>}/>
                    <Route exact path="/sign-up"
                           element={<SignUp setConnectedUsername={setConnectedUsername}/>}/>
                    <Route exact path="/chat-screen" element={<ChatScreen user={connectedUsername}/>}/>
                </Routes>
            </div>

        </BrowserRouter>
    );
}

export default App;