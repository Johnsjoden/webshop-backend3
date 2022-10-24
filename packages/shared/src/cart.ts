export default interface Cart {
    _id: string
    delieveryFee: number
    totalPrice: number
    status: string,
    products: [
        {
            quantity: number,
            _id: string,
            description: string,
            title: string,
            image_url: string,
            category: string,
            weight: string,
            price: number,
            manufacturer: string,
        }
    ]
}