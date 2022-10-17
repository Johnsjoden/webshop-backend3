import { User } from "@webshop-types/shared";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LogIn() {

    const [userEmail, setuserEmail] = useState<string>("");
    const [userPassword, setUserPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const logInUser = async (userEmail: string, userPassword: string): Promise<void> => {
        const user: User = {
            email: userEmail,
            password: userPassword
        }
        try {
            const response = await axios.post<any>("/auth/login", user)
            const token = response.data.access_token;
            console.log(token);
            localStorage.setItem("backend3", token)
            navigate("/")
        } catch (err) {
            if (err) {
                setError("userEmail or password is wrong")
            }
        }
    }

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
                        <label>Email: </label>
                        <input
                            className="inputField"
                            type="text"
                            placeholder="Email"
                            value={userEmail}
                            onChange={(e) => setuserEmail(e.target.value)}
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
                        <button className="buyButton" onClick={(e) => logInUser(userEmail, userPassword)}>Log In</button>
                    </div>
                    <div>
                        {error}
                    </div>
                </div>
                <Link to="/register" className="linkRegister">Register a new user</Link>
            </div>
        </section>
    </div>)
}