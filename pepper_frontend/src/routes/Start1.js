import Navbar from "./Navbar";
import TextInput from "./TextInput";
import RecipeCard from "./RecipeCard";
import "./start.css";
import { Svg_1, Svg_2 } from "./Svg";
import OgNav from "./OgNav";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useState } from "react";

const Start_1 = () => {
    const [arr,setArr]=useState([]);
    useEffect(()=>{
        const fetchRecent=async()=>{
            const res=await fetch("https://pepperpalate-backend.onrender.com/recipes",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })

            const data=await res.json();
            setArr(data);
        }

        fetchRecent();
    })
    
    const[cookie,setCookie]=useCookies(["token"]);
    return (
        <div className="content flex flex-col h-screen w-screen">
            <OgNav />

            {
                !cookie.token ? <div className="auth  mt-24 flex flex-col justify-center items-center">
                <p className="text-5xl ml-8 font-bold text-[#fa1111] z-0">
                    Have you created account in Pepper Palate ?

                </p>
                <div className="mt-8 flex justify-center items-center space-x-8 mr-4">
                    <a href="/signup"><button className="shadow-button border-2 rounded-md p-2 bg-lime-400  text-xl hover:text-[#fa1111] shadow-2xl flex" id="signup">

                        <div className="mr-2 font-semibold">Sign Up</div>
                        <span className="inline">
                            <Svg_1 />
                        </span>

                    </button></a>
                    <a href="/login"><button className="shadow-button border-2 rounded-md p-2 bg-[#fa1111]   text-xl hover:text-lime-400 shadow-2xl text-white flex" id="login">
                        <div className="mr-2 font-semibold">
                            Login</div>
                        <span>
                            <Svg_2 />

                        </span></button></a>
                </div>

                

            </div> : ""
            }
            
            <h1 className="text-5xl ml-8 font-bold text-[#fa1111] mt-24 text-center">About Pepper Palate!</h1>

            <p className="about mr-auto ml-auto mt-2 w-2/3 border-2 rounded-lg p-4 shadow-2xl">
            Pepper Palate is an innovative recipe website crafted to provide culinary inspiration and practical solutions for home cooks of all skill levels. It offers an extensive collection of recipes that span various cuisines, dietary needs, and meal types, each accompanied by step-by-step instructions and vibrant photographs to guide users. The site’s user-friendly design includes advanced search filters, making it easy to find recipes based on ingredients, cooking time, and dietary preferences. Pepper Palate also encourages community interaction through features like user accounts for saving favorite recipes, creating shopping lists, and leaving reviews. Additionally, the website includes educational content such as cooking technique guides, ingredient spotlights, and video tutorials. With its mobile-responsive design, Pepper Palate ensures users can access its rich content from any device, making it an essential tool for anyone looking to explore and enjoy the world of cooking.


            </p>

            <h1 className="font-bold text-4xl text-center mt-8 border-b-2 pb-4">Recent Recipe Sensations</h1>
            <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full mb-8 justify-items-center">
                {arr.length ? (
                    arr.map((el) => (
                        <RecipeCard
                            key={el._id}
                            imgSrc={el.imgSrc}
                            description={el.cardDescription}
                            title={el.title}
                            author={el.user.username}
                            id={el._id}
                        />
                    ))
                ) : (
                    <div></div>
                )}
            </div>


        </div>
    )
}



export default Start_1;