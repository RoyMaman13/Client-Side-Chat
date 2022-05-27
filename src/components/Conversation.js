import React, { useState, useEffect } from 'react'
import './Conversation.css'
import "./chatContent.css";
import { Button, Stack, Form } from 'react-bootstrap'
import * as signalR from "@microsoft/signalr";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { serverPath } from '../serverPath.js'

let inMessage = null;

const Conversation = (props) => {

    const scrollToBottom = () => {
        const element = document.getElementById("conversation_display");
        element.scrollTop = element.scrollHeight;
    }

    async function SendMessage(event) {
        event.preventDefault();
        inMessage = document.getElementById("newMessage").value;
        document.getElementById("newMessage").value = '';
        const AddMesageToUser = await fetch('https://' + serverPath + '/Api/contacts/' + props.chatWith + '/messages?username=' + props.user, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: inMessage })
        });
        const getContactServer = await fetch('https://' + serverPath + '/Api/contacts/' + props.chatWith + '?username=' + props.user, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        var response = await getContactServer.json();
        var server = response['server'];
        const AddMesageToContact = await fetch('https://' + server + '/Api/transfer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ from: props.user, to: props.chatWith, content: inMessage })
        });
        // const data = await response.json();
        props.signalR();
    }

    const [list, setList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('https://' + serverPath + '/Api/contacts/' + props.chatWith + '/messages?username=' + props.user);
            const data = await res.json();
            setList(data);
        }

        fetchData();
    }, [props.render]);

    return (

        <div className='conversation'>
            <div className="conv_display" id="conversation_display">
                {
                    list.map(({ content, created, sent }) => {
                        return (
                            <div className={(sent == true) ? "chat__item__me" : "chat__item__content"}>
                                <div className={(sent == true) ? "chat__item" : "chat__item-friend"}>
                                    <div className="chat__content">
                                        <div>{(sent) ? "me: " : (props.chatWith) + ": "}</div>
                                    </div>
                                    <div>{content}</div>
                                    <div className="chat__time">
                                        <div>{created}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div ref={scrollToBottom}></div>
            <>

                <div className='conv_footer'>
                    <form onSubmit={SendMessage}>
                        <Stack direction="horizontal" gap={3}>
                            <Form.Control className="me-auto" id="newMessage" placeholder="Enter your messege..." />
                            <div className="vr" />
                            <Button variant="secondary" onClick={SendMessage}>Send</Button>
                        </Stack>
                    </form>
                </div>
            </>
        </div>

    )
}

export default Conversation