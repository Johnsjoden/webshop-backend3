import { useState, useEffect } from 'react';
import { ProductItems, User } from "@webshop-types/shared"
import axios from 'axios';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Detail() {

    axios.defaults.baseURL = process.env.REACT_APP_TODO_API || "http://localhost:3000"
    //patrik

    const fetchProducts = async (): Promise<ProductItems[]> => {
        const response = await axios.get<ProductItems[]>("/products")
        return response.data
    }

    const [products, setProducts] = useState<ProductItems[]>([]);
    const [error, setError] = useState<string | undefined>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser()
        fetchProducts()
            .then(setProducts)
            .catch((error) => {
                setProducts([])
                setError('Something went wrong when fetching products...')
            });
    }, []);


    const [email, setEmail] = useState<string>("");
    const [session, setSession] = useState<boolean>(true);

    const token = localStorage.getItem('backend3')
    // console.log(token)

    const fetchUser = async (): Promise<void> => {
        try {
            const response = await axios.get<any>("/auth/profile", { headers: { "Authorization": "Bearer " + token } })
            setEmail(response.data.email)
            setSession(false)
            // console.log(session)
            // console.log(response.data)
            // console.log("userId: ", response.data.userId)

        } catch (err) {
            console.log("Something went wrong fetching user", err)
        }
    }

    const addToCart = async (item: ProductItems): Promise<void> => {
        // console.log("Add to cart...?", item)

        const productItem: ProductItems[] = [{
            description: item.description,
            title: item.title,
            category: item.category,
            weight: item.weight,
            price: item.price,
            manufacturer: item.manufacturer
        }]
        try {
            const response = await axios.patch<User>("user/cart", productItem, { headers: { "Authorization": "Bearer " + token } })
            setCartProducts(response.data)
            // console.log(cartProducts?.status?.varukorg)
            // console.log(response.data)
        } catch (err) {
            console.log(err)
        }

    }

    const [cartProducts, setCartProducts] = useState<User>()



    const output = () => {
        if (error) {
            return (<div>{error}</div>)
        } else if (products) {
            return (<div className="ProductList">{
                products.map((item, index) => {
                    return (
                        <div key={index} className="ProductCardDetail">
                            <p>{item.title}</p>
                            <img className="ProductImage"
                                src={item.image_url}
                                alt={item.title} />
                            <p >Price: {item.price}SEK</p>
                            <p >Weight: {item.weight}KG</p>
                            <p >Description: {item.description}</p>
                            <p >Category: {item.category}</p>
                            <p key={3}>Manufacturer: {item.manufacturer}</p>
                            <button className='buyButton' onClick={() => addToCart(item)}>Add to cart</button>
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
                    {session ? (<p> </p>) : (<p>Logged in as: {email}</p>)}
                </div>
                <div>
                    <Link to="/user/login" className='link'>Log in</Link>
                </div>
            </header>

            <div>
                { }
            </div>

            <section>
                {output()}
            </section>
            <br />
        </div>


    );
}

