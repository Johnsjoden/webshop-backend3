import { useState, useEffect } from 'react';
import { ProductItems, User } from "@webshop-types/shared"
import axios from 'axios';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Start() {

    axios.defaults.baseURL = process.env.REACT_APP_TODO_API || "http://localhost:3000"
    //test
    const [products, setProducts] = useState<ProductItems[]>([]);
    const [error, setError] = useState<string | undefined>();
    const [userName, setUserName] = useState<string>("");
    const [session, setSession] = useState<boolean>(true);

    const navigate = useNavigate();
    const navigateToDetailPage = () => {
        navigate("/detail");
    }

    const fetchProducts = async (): Promise<ProductItems[]> => {
        const response = await axios.get<ProductItems[]>("/products")
        return response.data
    }

    const fetchUser = async (): Promise<void> => {
        const token = localStorage.getItem('backend3')
        try {
            const response = await axios.get<any>("/auth/profile", { headers: { "Authorization": "Bearer " + token } })
            setUserName(response.data.username)
            setSession(false)
            console.log(session)
            console.log(response.data.username)
        } catch (err) {
            console.log("Something went wrong fetching user", err)
        }
    }

    function logOut() {
        localStorage.clear();
    }

    useEffect(() => {
        fetchUser()
        fetchProducts()
            .then(setProducts)
            .catch((error) => {
                setProducts([])
                setError('Something went wrong when fetching products...')
            });
    }, []);

    const output = () => {
        if (error) {
            return (<div>{error}</div>)
        } else if (products) {
            return (<div className="ProductList">{
                products.map((item) => {
                    return (
                        <div onClick={navigateToDetailPage} className="ProductCardStart">
                            <p key={1}>{item.title}</p>
                            <img className="ProductImage"
                                src={item.image_url}
                                alt={item.title} />
                            <p key={2}>Price: {item.price}SEK</p>
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
                </div>
                <div>
                    <h2>StartPage</h2>
                    {/* {session ? (<p></p>) : (<p>Logged in as: {userName}</p>)} */}
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
            </header>
            <section>
                {output()}
            </section>
        </div>
    );
}

