import{useAuth} from "../context/AuthContext"
import SignedNavbar from "./SignedNavBar";
import Navbar from "./Navbar";
const OgNav=()=>{

    const {token}=useAuth();
    
    if(token){
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