import { User } from "@webshop-types/shared";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LogIn() {


    const logInUser = async (userName: string, userPassword: string): Promise<void> => {
        console.log(userName, userPassword);
        const user: User = {
            username: userName,
            password: userPassword
        }
        const response = await axios.post<any>("/auth/login", user)
        const token = response.data.access_token;
        console.log(token);
        localStorage.setItem("backend3", token)
    }

    const [userName, setUserName] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");

    return (<div className="App">
        <header className='header'>
            <div>
                <Link to="/" className="link">Back to StartPage</Link>
            </div>
            <div>
                <h2>LogInPage</h2>
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
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input
                            className="inputField"
                            type="text"
                            placeholder="Password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                    </div>
                    <div className='buttonBox'>
                        <button className="buyButton" onClick={(e) => logInUser(userName, userPassword)}>Log In</button>
                    </div>
                </div>
            </div>
        </section>
    </div>)
}