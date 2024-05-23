import { useEffect, useState } from "react";
import OgNav from "./OgNav";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import UserRecipeCard from "./UserRecipeCard";

const Profile = () => {
    const { userID } = useParams();
    const [cookie] = useCookies(["token"]);
    const [user, setUser] = useState({});
    const [arr, setArr] = useState([]);
    const [show, setShow] = useState(false);
    const [image, setImage] = useState(null);
    const [imgSrc, setImgSrc] = useState("");
    const token = cookie.token;

    const submitImage = async () => {
        if (!image) {
            alert("Please select an image to upload.");
            return;
        }

        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "nn1a9bc7");
        data.append("cloud_name", "da52sn5mt");

        const res = await fetch("https://api.cloudinary.com/v1_1/da52sn5mt/image/upload", {
            method: "POST",
            body: data
        });

        const result = await res.json();
        const newImgSrc = result.url;
        setImgSrc(newImgSrc);

        const body = { url: newImgSrc };
        const bacRes = await fetch("https://pepperpalate-backend.onrender.com/auth/profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const backData = await bacRes.json();
        console.log(backData);
        setShow(false);
        alert("Successfully Uploaded Image");
        fetchUser(); // Fetch updated user data after uploading the image
    };

    const fetchUser = async () => {
        const res = await fetch("https://pepperpalate-backend.onrender.com/auth/getUser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        setUser(data || {});
    };

    const fetchRecipes = async () => {
        const recipeUrl = `https://pepperpalate-backend.onrender.com/recipes/userRecipes`;
        const res = await fetch(recipeUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        setArr(data || []);
    };

    useEffect(() => {
        fetchUser();
        fetchRecipes();
    }, [token]);

    console.log(user);

    return (
        <div className="flex flex-col">
            <OgNav />
            <div className="profile-card w-full mt-28 flex justify-center items-center flex-col border-b-2 pb-12">
                <img
                    className="w-1/12 rounded-xl mb-2"
                    src={user.profile || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKkAAACUCAMAAADf7/luAAAAMFBMVEXm5uampqagoKDh4eGjo6Pp6empqanFxcW6urrBwcGtra3R0dHNzc2zs7PX19fU1NSEMywJAAADRklEQVR4nO2bWZLrIAwAzSLvkPvfdrCdTOIaJwEkhP2e+idV+eoCJBbJTSMIgiAIgiAIgiAIgvCPAAsvvycluPl56N1CP8y+OaUsNMYPo9XWWrUQfrUdB2+ak9mC79xD8kn4x3X+TKpg+vaP5kO27c1ZXIOnPrR8oM/iOrefRYNqO9eWXAdUHc/7bg2o6sMKvv3uubq2dSMLpjeBdKBqp4qqMEdqbszVVGH+Fkp7dC1VuMXO/AN7q6IagilRVKk6YWXG1CENgzoaflEY0hbphh7YBxV8+oiuo8o+/8Zlmjrm+YcuTzSodryDmhNOd1PeoErN+a/w5n9IT6VPWkbT9N3pFc6dCnqUac9nakaEqFJ8MQU3zDINC5Vv+rOT6YbtuEQb1DJdFiqbaeZO+mvquEQNbpmGhcoVUgY3pGFQuUx9/la6oT2T6Q1typSmYEKbMl39r2NKMfs8oheKqOtkKYMUVYrtMJV9iboP6cgleqETymVOfXBDiSrFd5K+zO0kLFSUKd8yXZ73EaKsD/6AGlPWN5QO8drD+4SGuKCwXU3uDNlvfQOvaH6iYn/phznzTZq/JgVZl37rKpR5TGRtdyfKHU4rWbt/pSJf8hN6vcJpYvGsQtnsVzXpoMpd39mTsKtqvlfTI6KbJuq2TKyqPiqvWle/wQtMxBHADrVbe1ZVmL6aTifoRQQzRUy/dVPlQYVmdlEhZa2ba3ZNwjQm9EuN1aI/hL1Oyvy6TgKApks+TNm2418CkNeLYEf2yJoiOiQPVRVvgyd0maKLK+uJClnf59IEg34/5VmsgC3wriVeFlXkiG6jehFRFtW8xsO/FL9T4V5OXyl8BwBP5LlQ9hCADvsnRXs88jskD1XL3aoBXdrdo4vNv3GkokoV65rNfDJ9jy10rkI3H/2lzCMlpl7yjkJ1FHLPhQKetBnqQYlMRR74G/ThT7fh7ymw/ZMc9g5MyY9/+C6ZdxBPP77v7B3U/Wh5dbIYyGtphTwXSD1zvzGKgfY7pDJp/25Km/xxLTKfoc1TZTaoDdJbCrJB6jOUvQk5H2zGQ/lpJ7o97jOEpfTcVo44SBs+CiYp4tZJMf2vTXVJSFsUTEkoRQVBEARBEIQjfgDVyCpqKlcIqgAAAABJRU5ErkJggg=="}
                    alt="Profile"
                />
                <p className="font-bold mb-2">{user.username}</p>
                <a href="/post">
                    <button className="p-2 bg-lime-300 shadow-button">Post a Recipe!</button>
                </a>
                {show ? (
                    <div>
                        <input
                            id="image"
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <button onClick={submitImage} className="border-2 p-2 mt-2 shadow-button bg-[#60e1f0]">
                        Upload your profile Photo
                        </button>
                    </div>
                ) : (
                    <button className="border-2 p-2 mt-2 shadow-button bg-[#60e1f0]" onClick={() => setShow(true)}>
                        Upload your profile Photo
                    </button>
                )}
            </div>

            <h1 className="text-4xl font-bold mt-4 text-center">Your Recipes</h1>

            <div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full mb-8 justify-items-center">
                {arr.length ? (
                    arr.map((el) => (
                        <UserRecipeCard
                            key={el._id}
                            imgSrc={el.imgSrc}
                            description={el.cardDescription}
                            title={el.title}
                            author={user.username}
                            id={el._id}
                        />
                    ))
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
};

export default Profile;
