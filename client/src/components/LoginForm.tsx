import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import "../styles/styles.css"

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);

    return (
        <div className="loginform">
            <div className="one-input">
            <input
                className="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder='Email'
            />
            </div>
            <div className="one-input">
            <input
                className="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='Password'
            />
            </div>
            <button className="btn-login" onClick={() => store.login(email, password)}>
                Login
            </button>
            <br/>
            <button className="btn-register" onClick={() => store.registration(email, password)}>
                Register
            </button>
            <br/>
        </div>
    );
};

export default observer(LoginForm);