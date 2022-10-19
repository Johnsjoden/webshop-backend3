import Kundvagn from "./kundvagn"

export default interface User {
    email: string,
    password?: string,
    name?: string,
    status?: {
        varukorg: [Kundvagn],
        registrerad: [Kundvagn],
        behandlas: [Kundvagn],
        underleverans: [Kundvagn],
        levererad: [Kundvagn]
    }, 
    phonenumber?: string,
    adress?: string
}