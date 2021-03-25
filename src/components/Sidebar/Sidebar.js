import React from 'react'
import styled from 'styled-components';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import SidebarOption from './SidebarOption';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { db, auth } from '../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector, useDispatch } from 'react-redux';
import { selectSidebar, hideOptions, showOptions, selectOptions } from '../../features/app/appSlice';
function Sidebar() {
    const sidebar = useSelector(selectSidebar);
    const options = useSelector(selectOptions);
    const dispatch = useDispatch();
    const [channels] = useCollection(db.collection('rooms'));
    const [user] = useAuthState(auth);
    return (
        <SidebarWrapper>
            <SidebarContainer active={sidebar}>
                <SidebarHeader>
                    <SidebarInfo>
                        <h3>React FAM HQ</h3>
                        <h4><FiberManualRecordIcon /> {user?.displayName}</h4>
                    </SidebarInfo>
                    <CreateIcon />
                </SidebarHeader>
                <SidebarOptionsWrapper visible={options}>
                    <SidebarOption Icon={InsertCommentIcon} title="Threads" />
                    <SidebarOption Icon={InboxIcon} title="Mentions &amp; reactions" />
                    <SidebarOption Icon={DraftsIcon} title="Saved items" />
                    <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
                    <SidebarOption Icon={PeopleAltIcon} title="People &amp; user groups" />
                    <SidebarOption Icon={AppsIcon} title="Apps" />
                    <SidebarOption Icon={FileCopyIcon} title="File browser" />
                    {options && (
                        <div onClick={() => dispatch(hideOptions())}>
                            <SidebarOption Icon={ExpandLessIcon} title="Show less" />
                        </div>
                    )}
                </SidebarOptionsWrapper>
                {!options && (
                    <div onClick={() => dispatch(showOptions())}>
                        <SidebarOption Icon={ExpandMoreIcon} title="Show More" />
                    </div>
                )}
                <hr />
                <SidebarOption Icon={AddIcon} addChanenlOption title="Add Channel" />
                {channels?.docs.map((doc) => (
                    <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
                ))}
            </SidebarContainer >
        </SidebarWrapper>
    )
}

export default Sidebar;

const SidebarWrapper = styled.div`
    overflow: hidden;
`

const SidebarContainer = styled.div`
    background-color: var(--slack-color);
    position: fixed;
    top: 0;
    left:0;
    color: #fff;
    width: 100%;
    max-width:260px;
    height: 100vh;
    margin-top: 56px;
    border-top: 1px solid #49274b;
    transition: all 0.25s ease;
    z-index: 9999;
    > hr {
        margin: 4px 0;
        border: 1px solid #49274b;
    }
    @media(max-width: 959.98px) {
    transform: ${props => props.active ? "translateX(0px)" : "translateX(-260px)"};
  }
`
const SidebarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid #49274b;
    > .MuiSvgIcon-root {
        padding: 8px;
        color: #49274b;
        font-size: 18px;
        background-color: white;
        border-radius: 999px
    }
`

const SidebarInfo = styled.div`
    flex: 1;
    > h3 {
        font-size: 1rem;
        font-weight: 700;
        margin-bottom:4px;
    }
    > h4 {
        display: flex;
        font-size: 0.875rem;
        font-weight: 400;
        align-items:center;
        > .MuiSvgIcon-root {
            font-size: .875rem;
            margin: 1px 2px 0px 0px;
            color: green;
        }
    }
`
const SidebarOptionsWrapper = styled.div`
    display: ${props => props.visible ? "block" : "none"}
`
