import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@webshop-types/shared";
import axios from "axios";
import "../App.css"

export default function Register() {


    axios.defaults.baseURL = process.env.REACT_APP_TODO_API || "http://localhost:3000"

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const createUser = async (username: string, password: string): Promise<void> => {
        const user: User = {
            username,
            password
        }
        try {
            const response = await axios.post<User>("/user", user)
                .then((response => console.log(response)));
            navigate("/user/login")
        } catch (err) {
            if (err) {
                setError("Username already exists")
            }
        }
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
                            <input
                                className="inputField"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label>Password: </label>
                            <input
                                className="inputField"
                                type="text"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="buttonBox">
                            <button className='buyButton' onClick={(e) => createUser(username, password)}>Create User</button>
                        </div>
                        <div>
                            {error}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}