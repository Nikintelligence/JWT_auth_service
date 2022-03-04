import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";
import "./styles/styles.css"

const App: FC = () => {
    const {store} = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    if (store.isLoading) {
        return <div>Loading...</div>
    }

    if (!store.isAuth) {
        return (
          <div>
            <div>
                <div className="container">
                  <LoginForm/>
                  <button className="btn-users" onClick={getUsers}>Get list of users</button>
                </div>
            </div>
          </div>
        );
    }

    return (
        <div>
            <h1>{store.isAuth ? `${store.user.email} is authorized` : 'You need to authorize!'}</h1>
            <h1>{store.user.isActivated ? 'Account was verified by email' : 'Verify by your email!'}</h1>
            <button className="btn-logout" onClick={() => store.logout()}>logout</button>
            <div>
                <button className="btn-users" onClick={getUsers}>Get list of authorized users</button>
            </div>
            {users.map(user =>
                <div key={user.email}>{user.email}</div>
            )}
        </div>
    );
};

export default observer(App);