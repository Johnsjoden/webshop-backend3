import { useState } from "react";
import { Link } from "react-router-dom";
import {User} from "@webshop-types/shared";
import axios from "axios";
import "../App.css"

export default function Register() {

    axios.defaults.baseURL = process.env.REACT_APP_TODO_API || "http://localhost:3000"

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const createUser = (username: string): void => {
        const user: User = {
            username,
            password
        }
        axios.post<User>("/register", user)
        .then((response => console.log(response)))
    }

    return (
    <div className="App">
        <header className='header'>
            <div>
                <Link to="/" className="link">Back to StartPage</Link>
            </div>
            <div>
                <h2>RegisterPage</h2>
            </div>
            <div>

            </div>
        </header>
        <section>
            <div className="login">
                <div className="loginSpace">
                    <div>
                        <label>Username: </label>
                        <input type="text" placeholder="Username" className="inputField" />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="text" placeholder="Password" className="inputField" />
                    </div>
                </div>
            </div>
        </section>
    </div>)
}