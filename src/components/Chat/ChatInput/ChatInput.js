import React, { useState } from 'react'
import styled from 'styled-components'
import { db, auth } from '../../../firebase';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput({ channelName, channelId, chatRef }) {
    const [user] = useAuthState(auth);
    const [message, setMessage] = useState("")
    const sendMessage = (e) => {
        e.preventDefault();
        if (!channelId) {
            return false;
        }
        db.collection('rooms').doc(channelId).collection('messages').add({
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user?.displayName,
            userImage: user?.photoURL,
        })
        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
        });
        setMessage("");
    }
    return (
        <ChatInputContainer>
            <form>
                <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder={`Message #${channelName}`} />
                <button hidden type="submit" onClick={sendMessage}>Send</button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput


const ChatInputContainer = styled.div`
    border-radius: 20px;

    > form {
        position: relative;
        display: flex;
        justify-content: center;

        > input {
            position: fixed;
            bottom: 30px;
            width: 60%;
            border-radius: 3px;
            padding: 16px;
            border: 1px solid lightgray;
            outline: none;
        }
    }


`;