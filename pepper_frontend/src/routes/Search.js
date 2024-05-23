import { useState } from "react";
import Navbar from "./Navbar";
import RecipeCard from "./RecipeCard";
import OgNav from "./OgNav";

const Search = () => {
    const [search, setSearch] = useState("");
    const [arr, setArr] = useState([]);

    const onSearch = async () => {
        let url = `https://pepperpalate-backend.onrender.com/recipes/${search}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }

            });

            const response = await res.json();

            if (response.error) {
                alert(response.error);
            }
            setArr(response || []);
        }

        catch (err) {
            alert(err);
        }



    }

    return (
        <div className="content flex flex-col">
            <OgNav />
            <div className="mt-24 w-full flex justify-center items-center">
                <input
                    type="search"
                    value={search}
                    placeholder="Search for any recipes..."
                    className="border-2 border-r-0 border-black w-3/4 rounded-full rounded-r-none"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    className="border-2 border-black border-l-2 rounded-full rounded-l-none w-20 flex justify-center items-center"
                    onClick={onSearch}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="40" viewBox="0 0 24 24">
                        <path fill="grey" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14" />
                    </svg>
                </button>
            </div>

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
    );
}

export default Search;
