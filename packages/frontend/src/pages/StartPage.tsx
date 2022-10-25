import { useState, useEffect } from 'react';
import { ProductItems } from "@webshop-types/shared"
import axios from 'axios';
import '../App.css';
import { Link, useNavigate, } from 'react-router-dom';

export default function Start() {

    axios.defaults.baseURL = process.env.REACT_APP_TODO_API || "http://localhost:3000"

    const navigate = useNavigate();

    const [error, setError] = useState<string | undefined>();
    const [session, setSession] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");


    const searchDB = async (searchQuery: string): Promise<ProductItems[]> => {
        const searchWord = {
            searchQuery: searchQuery
        }
        const response = await axios.post<ProductItems[]>("/products/search", searchWord)
        console.log("Query", searchWord)
        console.log("searchDB", response)
        console.log("SearchResult")
        // navigate("/searchPage")
        return response.data
    }

    const fetchUser = async (): Promise<void> => {
        const token = localStorage.getItem('backend3')
        try {
            const response = await axios.get<any>("/auth/profile", { headers: { "Authorization": "Bearer " + token } })
            setSession(false)
        } catch (err) {
            console.log("Something went wrong fetching user", err)
        }
    }

    function logOut() {
        localStorage.clear();
    }

    useEffect(() => {
        fetchUser()
    });

    return (
        <div className="App">
            <header className='header'>
                <div>
                    <div>
                        <Link to="/searchpage" className='link'>Click here to search</Link>
                    </div>
                </div>
                <div>
                    <h2>StartPage</h2>
                </div>
                <div>
                    {session ?
                        (<Link to="user/login" className='link'>Log in</Link>) :
                        (<Link
                            to="/"
                            onClick={() => {
                                logOut();
                                setSession(true);
                            }}
                            className='link'>Log out</Link>)}
                </div>
                <div>
                    {session ? (<></>) : (<Link className="link" to="user/userinfo">Profile</Link>)}
                </div>
            </header>
        </div>
    );
}

