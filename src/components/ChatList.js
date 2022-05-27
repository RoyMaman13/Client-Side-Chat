import React from 'react'
import './ChatList.css'
import ChatListItems from './ChatListItems'
import { useState, useEffect } from 'react'
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap'
import { serverPath } from '../serverPath.js'

const ChatList = (props) => {
    //
    const [ChatsList, setChatsList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('https://' + serverPath + '/Api/contacts?username=' + props.user);
            const data = await res.json();
            console.log(data);
            setChatsList(data);
        }

        fetchData();
    }, [props.render]);


    async function invite() {
        var inid = document.getElementById("newContact").value;
        var server = document.getElementById("server").value;
        // const data = await response.json();
        try {
            const response = await fetch('https://' + server + '/Api/invitations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ from: props.user, to: inid, server: serverPath })
            });
            return (response.status === 201);
        } catch (e) {
        }
        return false;
    }


    async function createContact() {
        var inid = document.getElementById("newContact").value;
        var inname = document.getElementById("newName").value;
        var server = document.getElementById("server").value;
        const response = await fetch('https://' + serverPath + '/Api/contacts?username=' + props.user, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: inid, name: inname, server: server })
        });

    }

    //popup useState.
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true);
    }
    const handleClose = () => {
        setShow(false);
    }

    const createNewChatAPI = async (event) => {
        event.preventDefault();
        if (await invite() === false) {
            alert("Invalid Request !\n User doesn't exists / Already have chat with you.");
            return;
        }
        await createContact();
        props.signalR();
        handleClose();
    }


    return (
        <div className='chat-list'>
            <div className='chatlist-header'>
                <button className='popup' variant="" onClick={handleShow}>
                    <img src="newChat.png" alt="#" />
                </button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new contact</Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={createNewChatAPI}>
                        <Modal.Body>
                            <FloatingLabel label="Contact's Identifier">
                                <Form.Control id='newContact' placeholder="Contact's Identifier" />
                            </FloatingLabel>
                            <FloatingLabel label="Name">
                                <Form.Control id='newName' placeholder="Contact's Name" />
                            </FloatingLabel>
                            <FloatingLabel label="Server">
                                <Form.Control id='server' placeholder="Contact's serever" />
                            </FloatingLabel>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={createNewChatAPI}>
                                Add
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

                <ChatListItems setActiveChatUsername={props.setActiveChatUsername} ChatsList={ChatsList}
                    setRender={props.setRender} />
            </div>
        </div>
    )
}

export default ChatList