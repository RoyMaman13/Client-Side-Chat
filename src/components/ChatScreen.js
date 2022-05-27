import React, { useEffect } from 'react'
import './ChatScreen.css'
import ChatList from './ChatList'
import { useState } from 'react'
import Conversation from './Conversation'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { serverPath } from '../serverPath.js'


const ChatScreen = (props) => {


    //API CONTACT/ID
    const [render, setRender] = useState([]);
    const [activeChatUsername, setActiveChatUsername] = useState(null);

    //SignalR
    const [connection, setConnection] = useState();
    useEffect(() => {
        async function connectSignalR() {
            try {
                const connection = new HubConnectionBuilder()
                    .withUrl('https://' + serverPath + '/chathub')
                    .configureLogging(LogLevel.Information)
                    .build();

                connection.on("ReceiveMessage", (name, message) => {
                    setRender([]);
                });
                connection.onclose(e => {
                    setConnection();
                });

                await connection.start();
                setConnection(connection);
            } catch (e) {
                console.log(e);
            }
        }

        connectSignalR();
    }, []);

    const sendMessage = async (name, message) => {
        try {
            var message = "HELLO";
            await connection.invoke("SendMessage", name, message);
        } catch (e) {
            console.log(e);
        }
    }


    ////
    return (
        <div className='container outer inner-chat '>
            <div className='wrapper'>
                <div>
                    <ChatList user={props.user} render={render} setRender={setRender}
                        setActiveChatUsername={setActiveChatUsername} signalR={sendMessage} />
                </div>
                {(activeChatUsername === null) ? "" :
                    <Conversation user={props.user} render={render} setRender={setRender}
                        chatWith={activeChatUsername} signalR={sendMessage} />}

            </div>
        </div>
    )
}


export default ChatScreen;