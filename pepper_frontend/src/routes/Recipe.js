import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import StarRating from "./Rating";
import "./Recipe.css"
import { Svg_3 } from "./Svg";
import CheckboxWithLabel from "./cBox";
import { useCookies } from "react-cookie";
import StaticStarRating from "./StaticStar";
import OgNav from "./OgNav";


const Recipe = () => {
  const [recipe, setRecipe] = useState({});
  const [nutrition, setNutrition] = useState({});
  const [usr, setUsr] = useState("");
  const [ingrArr, setIngrArr] = useState([]);
  const [stsArr, setStsArr] = useState([]);
  const { recipeID } = useParams();
  const [rating, setRating] = useState(3);
  const [postBody,setPostBody]=useState("");
  const [cookie,setCookie]=useCookies(["token"]);
  const [reviews,setReview]=useState([]);
  const [ratings,setRatings]=useState({});
  const [user,setUser]=useState({});
  const url = `http://localhost:8080/recipes/show/${recipeID}`;
  let ratingUrl=`http://localhost:8080/recipes/${recipeID}/ratings`
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "get",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        setRecipe(data);
        setUsr(data.user?.username || "Unknown user");
        setIngrArr(data.ingredients || []);
        setStsArr(data.sts_process || []);
        setNutrition(data.nutrition || {});
        setReview(data.reviews || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchRating=async () => {
      try {
        const response = await fetch(ratingUrl, {
          method: "get",
          headers: {
            "Content-Type": "application/json"
          }
        });
        const data = await response.json();
        setRatings(data);
    
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchUser = async () => {
      let token=cookie.token;
      const res = await fetch("http://localhost:8080/auth/getUser", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          }
      });

      const data = await res.json();
      setUser(data || {});
  };

    fetchData();
    fetchRating();
    fetchUser();
  }, [url]);

  const totalTime = parseInt(recipe.prepTime || 0) + parseInt(recipe.cookTime || 0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    console.log("New rating:", newRating);
  };
  console.log(recipe)
  console.log(ratings)
  
  let reviewUrl=`http://localhost:8080/review/${recipeID}`
  
  const onPostReview=async()=>{
    const body={rating,body:postBody};
    const token = cookie.token;
    const res=await fetch(reviewUrl,{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body:JSON.stringify(body)
    })
    const rev=await res.json();
    if(rev.error){
      alert(rev.error);
      return;
    }

    alert("Successfully Posted Review")
    setReview([...reviews, rev])
    window.location.reload();

    console.log(rev)
  }

  return (
    <div className="flex flex-col">
      <OgNav/>
      <div className="body mt-24 lg:ml-96 md:ml-24 flex flex-col">
        <div className="title">
          <h1 className="text-4xl font-bold title-heading">{recipe.title || "Recipe Title"}</h1>
          <div className="flex rating">
            <StaticStarRating rating={ratings.averageRating} />
            <span className="ml-2 text-sm mt-[2.8px] font-bold">{ratings.averageRating || "Not Rated"}</span>
            <span className="ml-[5px] text-sm mt-[2.8px] tracking-wide text-neutral-500 pr-4 border-r-2"> ({ratings.ratingCount || "No one Rated"})</span>
            <span className="ml-6 text-xs mt-[5px] tracking-wide font-bold">{ratings.reviewBodyCount + " " + "REVIEWS"  || "0"}</span>
          </div>
        </div>

        <p className="w-2/5 des">
          {recipe.description || "No description available."}
        </p>

        <div className="flex sub mb-2">
          <div className="text-xs mt-6 border-r-2 w-40 pr-2">Submitted by {usr}</div>
          <Svg_3 width="5em" height="2em" className="mt-4 ml-4" />
          <svg className="mt-6 p-0" xmlns="http://www.w3.org/2000/svg" width="5em" height="2em" viewBox="0 0 120 55">
            <path fill="red" d="m23 12l-2.44-2.78l.34-3.68l-3.61-.82l-1.89-3.18L12 3L8.6 1.54L6.71 4.72l-3.61.81l.34 3.68L1 12l2.44 2.78l-.34 3.69l3.61.82l1.89 3.18L12 21l3.4 1.46l1.89-3.18l3.61-.82l-.34-3.68zm-13 5l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9z" />
          </svg>
        </div>

        <div className="recipe-image">
          <img src={recipe.imgSrc || "data:image/png;base64,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"} className="w-2/5 img" alt="Recipe" />
        </div>

        <div className="times border-2 outline outline-red-100 flex mt-4 w-2/5 flex-wrap p-2 mb-4 rounded-lg shadow-2xl">
          <div className="w-1/3 mb-4 times-card">
            <h1 className="font-bold">Prep Time:</h1>
            <p>{recipe.prepTime ? `${recipe.prepTime} mins` : "--"}</p>
          </div>

          <div className="w-1/3 mb-4 times-card">
            <h1 className="font-bold">Cook Time:</h1>
            <p>{recipe.cookTime ? `${recipe.cookTime} mins` : "--"}</p>
          </div>

          <div className="w-1/3 mb-4 times-card">
            <h1 className="font-bold">Total Time:</h1>
            <p>{totalTime ? `${totalTime} mins` : "--"}</p>
          </div>

          <div className="w-1/3 times-card">
            <h1 className="font-bold">Servings:</h1>
            <p>{recipe.Servings || "--"}</p>
          </div>
        </div>

        <div className="Ing mt-8 border-2 w-2/5 p-4 rounded-lg shadow-2xl mb-4">
          <h1 className="text-3xl font-bold mb-4">Ingredients</h1>
          <ul>
            {ingrArr.length > 0 ? ingrArr.map((el, index) => (
              <CheckboxWithLabel key={index} label={el} />
            )) : <p>No ingredients available.</p>}
          </ul>
        </div>

        <div className="sts mt-8 border-2 w-2/5 p-4 rounded-lg shadow-xl mb-4">
          <h1 className="text-3xl font-bold mb-4">Step-By-Step Process</h1>
          <ul>
            {stsArr.length > 0 ? stsArr.map((el, index) => (
              <div key={index} className="mb-2">
                <h1 className="font-bold underline">Step {index + 1}:</h1>
                <li>{el}</li>
              </div>
            )) : <p>No steps available.</p>}
          </ul>
        </div>

        <div className="nutri mt-8 border-2 w-2/5 p-4 rounded-lg shadow-xl mb-4">
          <h1 className="text-3xl font-bold">Nutrition Facts</h1>
          <h1 className="text-2xl">Calories: {nutrition.calories || "--"}</h1>
          <div className="nutri-child flex lg:space-x-12">
            <div className="left-div w-5/12">
              <div className="flex border-b-2">
                <p>Saturated Fat:</p>
                <p className="ml-auto">{nutrition.saturatedFat ? nutrition.saturatedFat+ "g" : "--"}</p>
              </div>
              <div className="flex border-b-2">
                <p>Total Fat:</p>
                <p className="ml-auto">{nutrition.totalFat ? nutrition.totalFat + "g" : "--"}</p>
              </div>
              <div className="flex border-b-2">
                <p>Sodium:</p>
                <p className="ml-auto">{nutrition.sodium ? nutrition.sodium + "mg" : "--"}</p>
              </div>
              <div className="flex border-b-2">
                <p>Calcium:</p>
                <p className="ml-auto">{nutrition.calcium ? nutrition.calcium  + "mg" : "--"}</p>
              </div>
              <div className="flex border-b-2">
                <p>Iron:</p>
                <p className="ml-auto">{nutrition.iron ? nutrition.iron  + "mg" : "--"}</p>
              </div>
              <div className="flex pot">
                <p>Potassium:</p>
                <p className="ml-auto">{nutrition.potassium ? nutrition.potassium + "mg" : "--"}</p>
              </div>
            </div>
            <div className="right-div w-5/12">
              <div className="flex border-b-2">
                <p>Protein:</p>
                <p className="ml-auto">{nutrition.protein ? nutrition.protein+ "g" : "--"}</p>
              </div>
              <div className="flex border-b-2">
                <p>Dietary Fiber:</p>
                <p className="ml-auto">{nutrition.dietaryFiber ? nutrition.dietaryFiber + "g" : "--"}</p>
              </div>
              <div className="flex border-b-2">
                <p>Total Sugars:</p>
                <p className="ml-auto">{nutrition.totalSugars ? nutrition.totalSugars + "g" : "--"}</p>
              </div>
              <div className="flex border-b-2">
                <p>Total Carbohydrates:</p>
                <p className="ml-auto">{nutrition.totalCarbohydrate ? nutrition.totalCarbohydrate + "g" : "--"}</p>
              </div>
              <div className="flex border-b-2">
                <p>Vitamin C:</p>
                <p className="ml-auto">{nutrition.vitaminC ? nutrition.vitaminC + "mcg" : "--"}</p>
              </div>
              <div className="flex">
                <p>Cholesterol:</p>
                <p className="ml-auto">{nutrition.cholesterol ? nutrition.cholesterol + "g" : "--"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="reviews w-2/5">
          <h1 className="text-4xl font-bold">Reviews({ratings.reviewBodyCount})</h1>
          {
               cookie.token ? <div className="review-post border-black  p-4 border-b-2 bg-[#eef5f3] pb-12 shadow-2xl rounded-xl">
               <div className="usr flex space-x-2 items-center mb-4">
                 <img className="w-8 h-8 rounded-full" src={user?.profile || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="} />
                 <p className="font-bold">{user?.username || "usr"}</p>
               </div>
   
               <div className="Your-Rating">
                 <h1 className="text-xl font-bold">Your Rating:</h1>
                 <StarRating className="text-2xl" rating={2} onRatingChange={handleRatingChange} />
               </div>
   
               <div className="Your-Review">
               <h1 className="text-xl font-bold">Your Review:</h1>
               <input type="text" placeholder="Write your review about this recipe..." className="w-full pb-24" value={postBody} onChange={(e)=>{
                 setPostBody(e.target.value)
               }} />
   
   
               </div>
   
               <button onClick={onPostReview} className="border-2 pl-2 pr-2 border-black mt-2 ml-[23rem]">Post</button>
   
               
   
             </div> : <div>
              You must signed in to post a review..
             </div>
          }
          

          <div className="all-reviews w-2/5 flex flex-col mt-4">


            {
              reviews ? reviews.map((el)=>{
                return(
                  <div className="review-body border-b-2">
                  <div className="usr flex space-x-2 items-center">
                    <img className="w-8 h-8 rounded-full" src={el.user?.profile || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="} />
                    <p className="font-bold">{el.user?.username || ""}</p>
                  </div>
                  {
                    el.rating ? <StaticStarRating rating={el.rating || 0}/> : ""
                  }
                  <div className="w-full">
                  {el.body || ""}
                  </div>
                  
                    
                  </div>
      
      
                  
                )
              }) : ""
            }

            

          </div>

        </div>



      </div>
    </div>
  );
};

export default Recipe;
