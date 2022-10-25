import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductItems, User, Cart } from "@webshop-types/shared";
import axios from "axios";

export default function UserInfo() {

    const [userFullName, setUserFullName] = useState<string>("");
    const [userPhonenumber, setUSerPhonenumber] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [userAdress, setUserAdress] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [registerMessage, setRegisterMessage] = useState<string>("");
    const [session, setSession] = useState<boolean>(true);
    const [userUpdatedName, setUserUpdatedName] = useState<string>("");
    const [userUpdatedPhone, setUserUpdatedPhone] = useState<string>("");
    const [userUpdatedEmail, setUserUpdatedEmail] = useState<string>("");
    const [userUpdatedAdress, setUserUpdatedAdress] = useState<string>("");
    const [cartProducts, setCartProducts] = useState<Cart[]>([]);


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
        }

        try {
            const response = await axios.patch<any>("/user/updateuser", user, { headers: { "Authorization": "Bearer " + token } })
            setUserUpdatedName(response.data.name)
            setUserUpdatedPhone(response.data.phonenumber)
            setUserUpdatedEmail(response.data.email)
            setUserUpdatedAdress(response.data.adress)
            setRegisterMessage("Updated Information")

        } catch (err) {
            if (err) {
                setError("Something went wrong updating Information")
            }
        }
    }

    const fetchCartProducts = async (): Promise<void> => {
        const response = await axios.get<any>("/carts/registered", { headers: { "Authorization": "Bearer " + token } })
        setCartProducts(response.data.register)
        console.log("Response.data.register", response.data.register)
        // console.log("Response.data.register.products", response.data.register.products)
        console.log("Length", response.data.register.length)
        // console.log("TotalPrice", response.data.register.totalPrice)
        // console.log("DeliveryFee", response.data.register.delieveryFee)
    }

    const fetchUser = async (): Promise<void> => {

        try {
            const response = await axios.get<any>("/user", { headers: { "Authorization": "Bearer " + token } })
            // console.log("FetchUser", response)
            setUserUpdatedName(response.data.name)
            setUserUpdatedPhone(response.data.phonenumber)
            setUserUpdatedEmail(response.data.email)
            setUserUpdatedAdress(response.data.adress)
            setSession(false)
        } catch (err) {
            console.log("Something went wrong fetching user", err)
        }
    }

    const cartItems = () => {
        if (error) {
            return (<div>{error}</div>)
        } else if (cartProducts) {
            return (
                <>
                    <div className="ProductList">{
                        cartProducts.map((item, index) => {
                            return (
                                <div key={index} className="ProductCardDetail">
                                    <p> Status: {item.status}</p>
                                    <p> Total Price: {item.delieveryFee + item.totalPrice} SEK</p>
                                    <p> Order nr: {item._id}</p>
                                    {item.products.map((innerItem, index) => {
                                        return (
                                            <>
                                                <p>{innerItem.title}</p>
                                                <p >Price: {innerItem.price}SEK</p>
                                                <p >Weight: {innerItem.weight}KG</p>
                                                <p >Description: {innerItem.description}</p>
                                                <p >Category: {innerItem.category}</p>
                                                <p >Manufacturer: {innerItem.manufacturer}</p>
                                                <p> Quantity: {innerItem.quantity}</p>
                                            </>
                                        )
                                    })}

                                </div>)
                        })
                    }
                    </div>
                </>
            )
        } else {
            (<div>'Something went wrong fetching my products...'</div>)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetchUser()
            fetchCartProducts()
        }, 1000)
        return () => clearInterval(interval)
    }, []);

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
                    <section className="userinformation">
                        <div><b>Name:</b> {userUpdatedName}</div>
                        <div><b>Phonenumber:</b> {userUpdatedPhone}</div>
                        <div><b>Email:</b> {userUpdatedEmail}</div>
                        <div><b>Adress:</b> {userUpdatedAdress}</div>
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

            </div>
        </section>
        <section>
            <div className="loginSpace">
                <h2>Your receipts from previos purchase:</h2>
                <div className="receiptSpace">
                    {cartItems()}
                </div>
            </div>
        </section>
    </div>)
}