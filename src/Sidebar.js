import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from "./SidebarChannel";
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoIcon from '@material-ui/icons/Info';
import CallIcon from '@material-ui/icons/Call';
import { Avatar } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import { useSelector } from 'react-redux';
import { selectUser } from './features/counter/userSlice';
import db, { auth } from './Firebase';
function Sidebar() {
    const user = useSelector(selectUser);
    const [channels, setChannels] = useState([]);
    useEffect(() => {
        db.collection('channels').onSnapshot(snapshot => (
            setChannels(snapshot.docs.map(doc => ({
                id: doc.id,
                channel: doc.data(),
            })))
        ))
    }, [])
    
    const AddChannel = () => {
        const channelName = prompt("Enter a new channel name");
        if (channelName) {
            db.collection('channels').add({
                channelName: channelName,
            })
        }
    }
    return (
        <div className = "sidebar">
            <div className = "sidebar__top">
                <h1>Let's Chat!</h1>
                <ExpandMoreIcon></ExpandMoreIcon>
            </div>
            <div className = "sidebar__channels">
                <div className = "sidebar__channelsHeader">
                    <div className = "sidebar__header">
                        <ExpandMoreIcon></ExpandMoreIcon>
                        <h4>Text Channels</h4>
                    </div>
                    <AddIcon className = "sidebar__addChannel" onClick = {AddChannel}></AddIcon>
                </div>
                <div className = "sidebar__channelsList">
                    {
                        channels.map(({ id, channel }) => (
                            <SidebarChannel key = {id} id = {id} channelName = {channel.channelName}></SidebarChannel>
                        ))
                    }
                </div>
            </div>
        <div className = "sidebar__voice">
            <SignalCellularAltIcon
                className = "sidebar__voiceIcon"
                fontSize = "large"
            ></SignalCellularAltIcon>
            <div className = "sidebar__voiceInfo">
                <h3>Voice Connected</h3>
                <p>Stream</p>
            </div>
            <div className = "sidebar__voiceIcons">
                <InfoIcon></InfoIcon>
                <CallIcon></CallIcon>
            </div>
        </div>

        <div className = "sidebar__profile">
            <Avatar onClick = {auth.signOut} src = {user.photo}></Avatar>
            <div className = "sidebar__profileInfo">
                <h3>{user.displayName}</h3>
                <p>#{user.uid.substring(0, 5)}</p>
            </div>

            <div className = "sidebar__profileIcons">
                <MicIcon></MicIcon>
                <HeadsetIcon></HeadsetIcon>
                <SettingsIcon></SettingsIcon>
            </div>
        </div>
        </div>
    )
}

export default Sidebar
