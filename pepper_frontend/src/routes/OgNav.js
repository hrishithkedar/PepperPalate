
import { useCookies } from "react-cookie"
import SignedNavbar from "./SignedNavBar";
import Navbar from "./Navbar";
const OgNav=()=>{

    const[cookie,setCookie]=useCookies(["token"]);
    
    if(cookie.token){
        return(
            <SignedNavbar />
        )
    }
    else{
        return(
            <Navbar />
        )
    }

}

export default OgNav;