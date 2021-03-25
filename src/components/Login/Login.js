import React from 'react'
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { auth, provider } from '../../firebase';

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch(error => alert(error.message))
    }

    return (
        <LoginContainer>
            <LoginInner>
                <img src="https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png" alt='' />
                <h2>Sign in to Sharf Slack</h2>
                <Button variant="contained" color="secondary" onClick={signIn} > Sign in with Google</Button>
            </LoginInner>
        </LoginContainer>
    )
}

export default Login;

const LoginContainer = styled.div`
    background-color: #f3f3f3;
    height: 100vh;
    display: grid;
    place-items: center;
`
const LoginInner = styled.div`
    padding: 2rem;
    text-align: center;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%), 0 2px 4px -1px rgb(0 0 0 / 30%);
    > img {
        object-fit: contain;
        height: 100px;
        margin-bottom: 1.25rem;
    }
    > h2 {
        margin-bottom: 0.75rem;
    }
`