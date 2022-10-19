import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "@webshop-types/shared";
import axios from "axios";
import "../App.css"

export default function Register() {

    axios.defaults.baseURL = process.env.REACT_APP_TODO_API || "http://localhost:3000"

    const [userEmail, setuserEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("");



    const navigate = useNavigate();

    const createUser = async (userEmail: string, password: string): Promise<void> => {
        const user: User = {
            email: userEmail,
            password: password
        }
        try {
            const response = await axios.post<User>("/user", user)
                .then((response => console.log(response)));
            navigate("/user/login")
        } catch (err) {
            if (err) {
                setError("userEmail already exists")
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
                            <label>Email: </label>
                            <input
                                className="inputField"
                                type="text"
                                placeholder="Email"
                                value={userEmail}
                                onChange={(e) => setuserEmail(e.target.value)} />
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
                            <button className='buyButton' onClick={(e) => createUser(userEmail, password)}>Create User</button>
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