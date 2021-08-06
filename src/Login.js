import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import {auth, provider} from './Firebase'
function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(error => alert(error.message));
    }
    return (
        <div className = 'login'>
            <div className = "login__logo">
                <img src = "https://cdn.dribbble.com/users/267404/screenshots/3713416/talkup.png"></img>
            </div>
            <Button onClick = {signIn}>Sign In</Button>
        </div>
    )
}

export default Login
