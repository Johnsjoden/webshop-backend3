import { Link } from "react-router-dom";

export default function LogIn() {
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