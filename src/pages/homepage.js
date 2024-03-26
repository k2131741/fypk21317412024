import Header from "./header"
import SignIn from "../component/auth/SignIn";
import SignUp from '../component/auth/SignUp.jsx';
import AuthDetails from '../component/AuthDetails.jsx';
import { Link, useNavigate } from "react-router-dom";


export default function Homepage() {

    const navigate = useNavigate();

    return (
        <>

            <div className = 'WelcomePage'>

                <SignIn />
            
                <AuthDetails />

            </div>



        </>
    )
}