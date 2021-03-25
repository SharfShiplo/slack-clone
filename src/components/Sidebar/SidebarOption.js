import React from 'react'
import styled from 'styled-components';
import { db } from '../../firebase';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../../features/app/appSlice';

function SidebarOption({ Icon, title, addChanenlOption, id }) {
    const dispatch = useDispatch();

    const addChannel = () => {
        const channelName = prompt('Please enter the channel name');
        if (channelName) {
            db.collection('rooms').add({
                name: channelName,
            })
        }
    }
    const selectChannel = () => {
        if (id) {
            dispatch(enterRoom({
                roomId: id,
            }))
        }
    }
    return (
        <SidebarOptionContainer
            onClick={addChanenlOption ? addChannel : selectChannel}
        >
            {Icon && <Icon fontSize='small' style={{ padding: "8px" }} />}
            {Icon ? (
                <h4>{title}</h4>
            ) : (
                    <SidebarOptionChannel>
                        <span>#</span> {title}
                    </SidebarOptionChannel>
                )}
        </SidebarOptionContainer>
    )
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
    display: flex;
    font-size: .75rem;
    align-items: center;
    padding: 0px 0px 0px 2px;
    cursor: pointer;
    :hover {
        opacity: 0.9;
        background-color: #340e36;
    }
    > h4 {
        font-weight: 500;
        > span {
            padding: .75rem;
        }
    }
`
const SidebarOptionChannel = styled.h4`
    padding: 8px 0;
    font-weight: 300;
`
