import LoginForm from "./component/loginForm";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import UserService from "./service/userService";

function App() {
    const [users, setUsers] = useState([]);
    const {store} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, []);

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    if (store.isLoading) {
        return (
            <div>is loading...</div>
        )
    }

    if(store.isAuth) {
        return (
            <div className="App">
                <h1>Пользователь авторизован ${store.user.email}</h1>
                <button onClick={() => store.logout()}>Выйти</button>
                <div>
                    <button onClick={getUsers}>Получить пользователей</button>
                </div>
                {users.map(user =>
                    <div key={user.email}>{user.email}</div>
                )}
            </div>
        )
    } else {
        return (
        <div className="App">
            <h1>АВТОРИЗУЙТЕСЬ</h1>
            <LoginForm />
        </div>
        )
    }

}

export default observer(App);
