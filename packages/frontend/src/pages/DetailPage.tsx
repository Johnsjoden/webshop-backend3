import { useState, useEffect } from 'react';
import {ProductItems} from "@webshop-types/shared"
import axios from 'axios';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Detail() {

    axios.defaults.baseURL = process.env.REACT_APP_TODO_API || "http://localhost:3000"

    const fetchProducts = async (): Promise<ProductItems[]> => {
        const response = await axios.get<ProductItems[]>("/products")
        return response.data
    }

    const [products, setProducts] = useState<ProductItems[]>([]);
    const [error, setError] = useState<string | undefined>();
    const navigate = useNavigate();

    useEffect(() => {
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
                        <div className="ProductCardDetail">
                            <p key={3}>{item.title}</p>
                            <img className="ProductImage"
                                src={item.image_url}
                                alt={item.title} />
                            <p key={3}>Price: {item.price}SEK</p>
                            <p key={3}>Weight: {item.weight}KG</p>
                            <p key={3}>Description: {item.description}</p>
                            <p key={3}>Category: {item.category}</p>
                            <p key={3}>Manufacturer: {item.manufacturer}</p>
                            <button className='buyButton'>BUY</button>
                        </div>)
                })
            }</div>)
        } else {
            (<div>'Something went wrong fetching my products...'</div>)
        }
    }

    return (

        <div className="App">

            <header className="header">
                <div>
                    <Link to="/" className='link'>Back to StartPage</Link>
                </div>
                <div>
                    <h2>DetailPage</h2>
                </div>
                <div>
                    <Link to="/user/login" className='link'>Log in</Link>
                </div>
            </header>
            <section>
                {output()}
            </section>
            <br />
        </div>


    );
}

