import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "@webshop-types/shared";
import axios from "axios";

export default function UserInfo() {

    const [userFullName, setUserFullName] = useState<string>("");
    const [userPhonenumber, setUSerPhonenumber] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [userAdress, setUserAdress] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [registerMessage, setRegisterMessage] = useState<string>("");
    const [session, setSession] = useState<boolean>(true);

    const token = localStorage.getItem('backend3')

    const updateUserInfo = async (
        userFullName: string,
        userPhonenumber: string,
        userEmail: string,
        userAdress: string): Promise<void> => {
        const user: User = {
            name: userFullName,
            phonenumber: userPhonenumber,
            email: userEmail,
            adress: userAdress,
            password: ""
        }
        try {
            const response = await axios.post<User>("/user/updateuser", user)
                .then((response => console.log(response)))
            setRegisterMessage("Updated Information")
        } catch (err) {
            if (err) {
                setError("Something went wrong updating Information")
            }
        }
    }

    const fetchUser = async (): Promise<void> => {

        try {
            const response = await axios.get<any>("/auth/profile", { headers: { "Authorization": "Bearer " + token } })
            setSession(false)
        } catch (err) {
            console.log("Something went wrong fetching user", err)
        }
    }

    useEffect(() => {
        fetchUser()
    })

    return (<div className="App">
        <header className='header'>
            <div>
                <Link to="/" className="link">Back to StartPage</Link>
            </div>
            <div>
                <h2>UserPage</h2>
            </div>
            <div>

            </div>
        </header>
        <section>
            <div className="login">
                <div className="loginSpace">
                    <section>
                        <div>Current Name: </div>
                        <div>Current Phonenumber: </div>
                        <div>Current Email: </div>
                        <div>Current Adress: </div>
                    </section>
                    <h2>Update your information</h2>
                    <div>
                        <label>Full Name: </label>
                        <input
                            className="inputField"
                            type="text"
                            placeholder="Full Name"
                            value={userFullName}
                            onChange={(e) => setUserFullName(e.target.value)} />
                    </div>
                    <div>
                        <label>Phonenumber: </label>
                        <input
                            className="inputField"
                            type="text"
                            placeholder="Phonenumber"
                            value={userPhonenumber}
                            onChange={(e) => setUSerPhonenumber(e.target.value)} />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input
                            className="inputField"
                            type="text"
                            placeholder="Email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Adress: </label>
                        <input
                            type="text"
                            placeholder="Adress"
                            className="inputField"
                            value={userAdress}
                            onChange={(e) => setUserAdress(e.target.value)} />
                    </div>
                    <button className="buyButton" onClick={(e) => updateUserInfo(userFullName, userPhonenumber, userEmail, userAdress)}>Update</button>
                    <div>
                        {registerMessage}
                        {error}
                    </div>
                </div>
                <div className="loginSpace">
                    <h2>Your receipts from previos purchase:</h2>
                    <div>
                        Placeholder Receipt
                    </div>
                </div>
            </div>
        </section>
    </div>)
}