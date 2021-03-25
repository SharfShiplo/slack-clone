import React from 'react'
import styled from 'styled-components'

export default function Message({ message,
    timestamp,
    user,
    userImage }) {
    return (
        <MessageContainer>
            <img src={userImage} alt="" />
            <MessageInfo>
                <h5>{user} {" "} <span>{new Date(timestamp?.toDate()).toUTCString()}</span></h5>
                <p>{message}</p>
            </MessageInfo>
        </MessageContainer>
    )
}

const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 16px;
    > img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
`
const MessageInfo = styled.div`
    padding-left: 8px; 
    > h5 > span {
        color: gray;
        font-weight: 300;
        margin-left: 4px;
        font-size: .75rem;
    }
    > p {
        font-size: .875rem;
        margin-top: 2px;
    }
`
