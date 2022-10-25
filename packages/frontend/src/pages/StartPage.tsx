import { useState, useEffect } from 'react';
import { ProductItems, User } from "@webshop-types/shared"
import axios from 'axios';
import '../App.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { response } from 'express';

export default function Start() {

    axios.defaults.baseURL = process.env.REACT_APP_TODO_API || "http://localhost:3000"
    //test
    const [products, setProducts] = useState<ProductItems[]>([]);
    const [error, setError] = useState<string | undefined>();
    const [session, setSession] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState<string>("");

    // const navigate = useNavigate();
    // const navigateToDetailPage = () => {
    //     navigate("/detail");
    // }

    const fetchProducts = async (): Promise<ProductItems[]> => {
        const response = await axios.get<ProductItems[]>(`/products`)
        return response.data
    }

    const searchDB = async (searchQuery: string): Promise<void[]> => {
        const searchWord = {
            searchQuery: searchQuery
        }
        const response = await axios.post<any[]>("/products/search", searchWord)
        console.log("Query", searchWord)
        console.log("searchDB", response)
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
        fetchProducts()
            .then(setProducts)
            .catch((error) => {
                setProducts([])
                setError('Something went wrong when fetching products...')
            });
    }, [searchQuery]);

    const output = () => {
        if (error) {
            return (<div>{error}</div>)
        } else if (products) {
            return (<div className="ProductList">{
                products.map((item, index) => {
                    return (
                        <div key={index} className="ProductCardStart">
                            <p>{item.title}</p>
                            <img className="ProductImage"
                                src={item.image_url}
                                alt={item.title} />
                            <p>Price: {item.price}SEK</p>
                            <Link className='buylink' to={`/detail/${item._id}`}>Read more on this product and buy</Link>
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
                    <Link to="/searchpage" className='link'>To searchpage</Link>
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
            <section>
                {output()}
            </section>
        </div>
    );
}