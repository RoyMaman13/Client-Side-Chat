import React from 'react'
import {MyContactAPI} from '../MyContactAPI'
import {useEffect, useState} from 'react';


const ChatListItems = (props) => {

    return (
        < div className='chatlist_items'>
            {
                //API CONTACT GET
                props.ChatsList.map((value, key) => {
                    return (

                        <button onClick={() => {
                            props.setActiveChatUsername(value.id)
                            props.setRender([]);
                        }} key={value.id}>
                            <div className="chatlist_item">
                            <span className='chat_info'>
                            <span className='chat_meta'>
                            <span className='nick'>{value.name}</span>
                            <span className='time'>
                        {(value.last != "null") ? value.lastdate : ""}
                            </span>
                            </span>
                            <span className='chat_msg'>
                        {/* {printLastMessage(last, lastdate)} */}
                                {(value.last != "null") ? value.last : ""}
                            </span>
                            </span>
                            </div>
                        </button>
                    );
                })
            }
        </div>
    )
}

export default ChatListItems