import React from 'react';
import styled from 'styled-components';
import { Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { selectSidebar, openSidebar, closeSidebar } from '../../features/app/appSlice';
function Header() {
    const sidebar = useSelector(selectSidebar);
    const dispatch = useDispatch();
    const [user] = useAuthState(auth);
    const sidebarHandler = () => {
        if (!sidebar) {
            dispatch(openSidebar())
        } else {
            dispatch(closeSidebar())
        }
    }
    return (
        <HeaderContainer>

            <HeaderLeft>
                <HeaderAvatar
                    src={user?.photoURL}
                    alt={user?.displayName}
                />

            </HeaderLeft>
            <HeaderSearch>
                <SearchIcon />
                <input placeholder="Search SHARFFAM" />
            </HeaderSearch>
            <HeaderRight>
                <SidebarMenu onClick={sidebarHandler}>
                    {!sidebar ? <MenuIcon /> : <MenuOpenIcon />}
                </SidebarMenu>
                <LogoutWrapper onClick={() => auth.signOut()}><ExitToAppIcon /></LogoutWrapper></HeaderRight>
        </HeaderContainer>
    )
}

export default Header;

const HeaderContainer = styled.div`
    display: flex;
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    background-color: var(--slack-color);
    color: #fff;
    box-sizing: border-box;
`;
const HeaderLeft = styled.div`
    flex: 0.3;
    display: flex;
    align-items: center;
    margin-left: 16px;
    > .MuiSvgIcon-root {
        margin: 0 16px 0 auto;
    }
`;
const HeaderAvatar = styled(Avatar)`
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
        opacity: 0.8;
    }
`;

const SidebarMenu = styled.div`
    margin-right: 0.5rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #49274b;
    cursor: pointer;
    > .MuiSvgIcon-root {
        font-size: 1.25rem;
    }
    @media(min-width: 960px) {
        display: none;
    }
`

const HeaderSearch = styled.div`
    flex: 0.4;
    opacity: 1;
    display: flex;
    border-radius: 4px;
    background-color: #421f44;
    align-items: center;
    padding: 0 16px;
    color: gray;
    border: 1px solid;


    > input {
        flex: 1;
        background-color: transparent;
        border: none;
        outline: none;
        min-width: 30vh;
        color: #fff;
        padding: 0 8px;
    }
    @media(max-width: 959.98px) {
        display: none;
    }
`
const HeaderRight = styled.div`
    padding: 0 16px;
    flex: 0.3;
    display: flex;
    justify-content: flex-end;
    @media(max-width: 959.98px) {
        flex: 0.7;
    }
`
const LogoutWrapper = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #49274b;
    cursor: pointer;
    > .MuiSvgIcon-root {
        font-size: 1.25rem;
    }
`