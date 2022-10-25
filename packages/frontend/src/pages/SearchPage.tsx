import { useState, useEffect } from 'react';
import { ProductItems } from "@webshop-types/shared"
import axios from 'axios';
import '../App.css';
import { Link, useNavigate, } from 'react-router-dom';

export default function Start() {

    axios.defaults.baseURL = process.env.REACT_APP_TODO_API || "http://localhost:3000"

    const [products, setProducts] = useState<ProductItems[]>([]);
    const [error, setError] = useState<string | undefined>();
    const [session, setSession] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResult, setSearchResult] = useState<ProductItems[]>([]);

    const fetchProducts = async (): Promise<ProductItems[]> => {
        const response = await axios.get<ProductItems[]>("/products")
        return response.data
    }

    const searchDB = async (searchQuery: string): Promise<ProductItems[]> => {
        const searchWord = {
            searchQuery: searchQuery
        }
        const response = await axios.post<ProductItems[]>("/products/search", searchWord)
        console.log("Query", searchWord)
        console.log("searchDB", response.data)
        setSearchResult(response.data)
        console.log("SearchResult", searchResult)
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
    }, []);

    const output = () => {
        if (error) {
            return (<div>{error}</div>)
        } else if (products) {
            return (<div className="ProductList">{
                searchResult.map((item, index) => {
                    return (
                        <div key={index} className="ProductCardStart">
                            <p>{item.title}</p>
                            <img className="ProductImage"
                                src={item.image_url}
                                alt={item.title} />
                            <p>Price: {item.price}SEK</p>
                            <Link to={`/detail/${item._id}`}>Read more on this product</Link>
                        </div>)
                })
            }</div>)
        } else {
            (<div>'Something went wrong fetching my products...'</div>)
        }
    }

    return (
        <div className="App">
            <header className='header'>
                <div>
                    <Link to="/" className='link'>Back to StartPage</Link>
                </div>

                <div className='buttonBox'>
                    <button className="buyButton" onClick={(e) => console.log(searchDB(searchQuery))}>Search</button>
                </div>
                <div>
                    <input
                        className="inputField"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>


                <div>
                    <h2>Searchpage</h2>
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
            <section>
                {output()}
            </section>
        </div>
    );
}

