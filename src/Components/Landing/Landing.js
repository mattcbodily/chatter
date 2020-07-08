import React, {useState} from 'react';
import axios from 'axios';

export default props => {
    let [firstName, setFirstName] = useState(''),
        [lastName, setLastName] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [verPassword, setVerPassword] = useState(''),
        [registerView, setRegisterView] = useState(false);
    
    const login = () => {
        axios.post('/api/login', {email, password})
        .then(res => {
            props.history.push({
                pathname: '/dashboard',
                state: {user: res.data}
            })
        })
        .catch(err => console.log(err));
    }

    const register = () => {
        if(password && password === verPassword){
            axios.post('/api/register', {firstName, lastName, email, password})
            .then(res => {
                props.history.push({
                    pathname: '/dashboard',
                    state: {user: res.data}
                })
            })
            .catch(err => console.log(err))
        } else {
            alert("Passwords don't match")
        }
    }

    return(
        <div>
            <h1>Welcome to Chatter</h1>
            {registerView
            ? (
                <>
                    <input value={firstName} onChange={e => setFirstName(e.target.value)}/>
                    <input value={lastName} onChange={e => setLastName(e.target.value)}/>
                </>
            )
            : null}
            <input value={email} onChange={e => setEmail(e.target.value)}/>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
            {registerView
            ? (
                <>
                    <input type='password' value={verPassword} onChange={e => setVerPassword(e.target.value)}/>
                    <button onClick={register}>Register</button>
                    <p>Already have an account? <span onClick={() => setRegisterView(false)}>Log in here</span></p>
                </>
            )
            : (
                <>
                    <button onClick={login}>Login</button>
                    <p>Don't have an account? <span onClick={() => setRegisterView(true)}>Sign up here</span></p>
                </>
            )}
        </div>
    )
}