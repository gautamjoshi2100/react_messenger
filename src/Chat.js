import React, { useEffect, useState } from 'react'
import './Chat.css'
import ChatHeader from "./ChatHeader.js"
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message.js'
import { useSelector } from 'react-redux';
import { selectUser } from './features/counter/userSlice';
import { selectChannelId, selectChannelName } from './features/counter/appSlice';
import db from './Firebase';
import firebase from 'firebase';
function Chat() {
    const user  = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (channelId) {
        db.collection('channels').doc(channelId).collection("messages").orderBy("timestamp", "desc").onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
        );
        }
    }, [channelId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("channels").doc(channelId).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user,
        })
        setInput('');
    }
    return (
        <div className = "chat">
            <ChatHeader channelName = {channelName}></ChatHeader>
            <div className = "chat__messages">
                {
                    messages.map((message) => (
                        <Message
                            timestamp = {message.timestamp}
                            message = {message.message}
                            user = {message.user}
                        ></Message>
                    ))
                }
            </div>
            <div className = "chat__input">
                <AddCircleRoundedIcon fontSize = "large"></AddCircleRoundedIcon>
                <form>
                    <input placeholder = {`Message #${channelName}`}
                            value = {input}
                            disabled = {!channelId}
                            onChange = {(e) => setInput(e.target.value)}
                    ></input>
                    <button type = "submit" className = "chat__inputButton" onClick = {sendMessage}>Send Message</button>
                </form>
                <div className = "chat__inputIcons">
                    <CardGiftcardIcon fontSize = "large"></CardGiftcardIcon>
                    <GifIcon fontSize = "large"></GifIcon>
                    <EmojiEmotionsIcon fontSize = "large"></EmojiEmotionsIcon>
                </div>
            </div>
        </div>
    )
}

export default Chat
