import {BrowserRouter,Routes,Route} from "react-router-dom"
import StartComp from "./routes/start";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Start_1 from "./routes/Start1";
import Search from "./routes/Search";
import Post from "./routes/postRecipe";
import Recipe from "./routes/Recipe";
import Update from "./routes/Update";
import SignedNavBar from "./routes/SignedNavBar";
import Profile from "./routes/profile";

function App() {
  return (
    <BrowserRouter>
    
    <Routes>

      <Route path="/" element={<Start_1/>} />
      <Route path="/home" element={<Start_1 />} />
      <Route path="https://pepperpalate-frontend.onrender.com/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/recipes" element={<Search />} />
      <Route path="/post" element={<Post/>} />
      <Route path="/recipes/:recipeID/update" element={<Update />} />
      <Route path="/recipes/:recipeID" element={<Recipe />} />
      <Route path="/profile/:userID" element={<Profile />} />
    
      
    </Routes>
    
    
    
    </BrowserRouter>
  );
}

export default App;
