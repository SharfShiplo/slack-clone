import React, { useRef, useEffect } from 'react'
import styled from 'styled-components';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { useSelector } from 'react-redux';
import { selectApp } from '../../features/app/appSlice'
import ChatInput from './ChatInput/ChatInput';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import Message from './Message/Message';
function Chat() {
    const chatRef = useRef(null);
    const roomId = useSelector(selectApp);
    const [roomDetails] = useDocument(
        roomId && db.collection('rooms').doc(roomId)
    )
    const [roomMessages, loading] = useCollection(roomId && db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc'))
    useEffect(() => {
        const scrollingView = () => chatRef?.current?.scrollIntoView({
            behavior: "smooth",
        });
        scrollingView()
        return () => {
            scrollingView()
        }
    }, [roomId, loading])
    return (
        <ChatContainer>
            {roomDetails && roomMessages ? (
                <>
                    <Header>
                        <HeaderLeft><h4><strong>#{roomDetails?.data().name}</strong></h4><StarOutlineIcon /></HeaderLeft>
                        <HeaderRight><p><InfoOutlinedIcon /> Details</p></HeaderRight>
                    </Header>

                    <ChatMessages>
                        {roomMessages?.docs.map((doc) => {
                            const { message, timestamp, user, userImage } = doc.data();
                            return (
                                <Message
                                    key={doc.id}
                                    message={message}
                                    timestamp={timestamp}
                                    user={user}
                                    userImage={userImage}
                                />
                            )
                        })}

                        <ChatBottom ref={chatRef} />
                    </ChatMessages>
                    <ChatInput chatRef={chatRef} channelName={roomDetails?.data().name} channelId={roomId} />
                </>
            ) : (<SlackImage>
                <div>
                    <img src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png" alt='' />
                    <p>Select or add a channel</p>
                </div>
            </SlackImage>)}

        </ChatContainer>
    )
}

export default Chat;

const ChatContainer = styled.div`
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    overflow-y: scroll;
    margin-top: 56px;
    padding-top:112px;
    padding-left:260px;
    background-color: #f3f3f3;
    @media(max-width: 959.98px) {
    padding-left:0px;
    }
`
const Header = styled.div`
    position: fixed;
    top: 56px;
    width: 100%;
    max-width: 1660px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:16px;
    background-color: white;
    box-sizing: border-box;
    box-shadow: 0 1px 3px rgba(0,0,0, 0.12);
    border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
    display: flex;
    align-items: center;

> h4 {
    text-transform: lowercase;
    
}
    > .MuiSvgIcon-root {
        margin-left: 8px;
        font-size: 21px;
    }
`;
const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    > p {
        display: flex;
        align-items: center;
        font-size: 0.875rem;
        
        > .MuiSvgIcon-root {
            margin-right: 4px;
            font-size: 1rem;
        }
    }
`;
const ChatMessages = styled.div``;
const ChatBottom = styled.div`
    padding-bottom: 200px;
    background-color: #f3f3f3;
`;

const SlackImage = styled.div`
    display: grid;
    place-items: center;
    width: 100%;
    height: calc(100vh - 200px);
    box-sizing: border-box;
    > div {
        width: 260px;
        text-align: center;
        > img {
        object-fit: contain;
        height: 100px;
        margin-bottom: 1.25rem;
    }
    }
`