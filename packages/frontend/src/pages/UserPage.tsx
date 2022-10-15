import { Link } from "react-router-dom";

export default function User() {
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
                    <h2>Update your information</h2>
                    <div>
                        <label>Full Name: </label>
                        <input type="text" placeholder="Full Name" className="inputField" />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="text" placeholder="Email" className="inputField" />
                    </div>
                    <div>
                        <label>Phonenumber: </label>
                        <input type="text" placeholder="Phonenumber" className="inputField" />
                    </div>
                    <div>
                        <label>Adress: </label>
                        <input type="text" placeholder="Adress" className="inputField" />
                    </div>
                    <button>Update</button>
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