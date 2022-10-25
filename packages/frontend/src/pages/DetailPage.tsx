import { useState, useEffect } from 'react';
import { ProductItems, User } from "@webshop-types/shared"
import axios from 'axios';
import '../App.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Detail() {

    axios.defaults.baseURL = process.env.REACT_APP_TODO_API || "http://localhost:3000"
    const { id } = useParams()

    const fetchProduct = async (): Promise<ProductItems> => {
        const response = await axios.get<ProductItems>(`/products/${id}`)
        return response.data

    }

    const fetchCartProducts = async (): Promise<void> => {
        const response = await axios.get<any>("/carts", { headers: { "Authorization": "Bearer " + token } })
        setCartProducts(response.data.cart.products)
    }

    const [product, setProduct] = useState<ProductItems>();
    const [error, setError] = useState<string | undefined>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser()
        fetchCartProducts()
        fetchProduct()
            .then(setProduct)
            .catch((error) => {
                setError('Something went wrong when fetching product')
            });
    }, []);


    const [email, setEmail] = useState<string>("");
    const [session, setSession] = useState<boolean>(true);
    const [cartProducts, setCartProducts] = useState<ProductItems[]>([]);

    const token = localStorage.getItem('backend3')

    const fetchUser = async (): Promise<void> => {
        try {
            const response = await axios.get<any>("/auth/profile", { headers: { "Authorization": "Bearer " + token } })
            setEmail(response.data.email)
            setSession(false)

        } catch (err) {
            console.log("Something went wrong fetching user", err)
        }
    }

    const addToCart = async (item: ProductItems): Promise<void> => {

        const productItem: ProductItems[] = [{
            _id: item._id,
            description: item.description,
            title: item.title,
            category: item.category,
            weight: item.weight,
            price: item.price,
            manufacturer: item.manufacturer
        }]
        try {
            const response = await axios.patch<any>("carts", productItem, { headers: { "Authorization": "Bearer " + token } })
            setCartProducts(response.data.cart.products)
        } catch (err) {
            console.log(err)
        }

    }

    const addToRegister = async (item: any): Promise<void> => {

        const productItems: ProductItems[] = [{
            _id: item._id,
            description: item.description,
            title: item.title,
            category: item.category,
            weight: item.weight,
            price: item.price,
            manufacturer: item.manufacturer
        }]
        try {
            await axios.patch<ProductItems>("/carts/registered", productItems, { headers: { "Authorization": "Bearer " + token } })
            navigate("/user/userinfo")
        } catch (err) {
            console.log(err)
        }

    }

    const cartItems = () => {
        if (error) {
            return (<div>{error}</div>)
        } else if (cartProducts && token) {
            return (
                <>
                    <h2>Varukorg</h2>
                    <div className="ProductList">{
                        cartProducts.map((item, index) => {
                            return (
                                <div key={index} className="ProductCardDetail">
                                    <p>{item.title}</p>
                                    <p >Price: {item.price}SEK</p>
                                    <p >Weight: {item.weight}KG</p>
                                    <p >Description: {item.description}</p>
                                    <p >Category: {item.category}</p>
                                    <p >Manufacturer: {item.manufacturer}</p>
                                    <p> Quantity: {item.quantity}</p>
                                </div>)
                        })
                    }
                    </div>
                    <button className='buyButton' onClick={() => addToRegister(cartProducts)}>Add to register</button>
                </>
            )
        } else {
            (<div>'Something went wrong fetching my products...'</div>)
        }
    }

    function logOut() {
        localStorage.clear();
    }

    const output = () => {
        if (error) {
            return (<div> {error} </div>)
        } else if (product) {
            return (
                <div className="ProductCardDetail">
                    <h1>You are viewing {product.title}</h1>
                    <p>{product.title}</p>
                    <img className="ProductImage"
                        src={product.image_url}
                        alt={product.title} />
                    <p >Price: {product.price}SEK</p>
                    <p >Weight: {product.weight}KG</p>
                    <p >Description: {product.description}</p>
                    <p >Category: {product.category}</p>
                    <p >Manufacturer: {product.manufacturer}</p>
                    <button className='buyButton' onClick={() => addToCart(product)}>Add to cart</button>
                </div>
            )
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
                    {session ?
                        (<Link to="/user/login" className='link'>Log in</Link>) :
                        (<Link
                            to="/"
                            onClick={() => {
                                logOut();
                                setSession(true);
                            }}
                            className='link'>Log out</Link>)}
                </div>
            </header>

            <div>
                { }
            </div>

            <section>
                {output()}
            </section>

            <div>
                {cartItems()}
            </div>
            <br />
        </div>


    );
}