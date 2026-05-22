import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Start_1 from "./routes/Start1";
import Search from "./routes/Search";
import Post from "./routes/postRecipe";
import Recipe from "./routes/Recipe";
import Update from "./routes/Update";
import Profile from "./routes/profile";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
    return (
        <AuthProvider>
            <Toaster position="top-center" />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Start_1 />} />
                    <Route path="/home" element={<Start_1 />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/recipes" element={<Search />} />
                    <Route path="/post" element={
                        <ProtectedRoute><Post /></ProtectedRoute>
                    } />
                    <Route path="/recipes/:recipeID/update" element={
                        <ProtectedRoute><Update /></ProtectedRoute>
                    } />
                    <Route path="/recipes/:recipeID" element={<Recipe />} />
                    <Route path="/profile/:userID" element={
                        <ProtectedRoute><Profile /></ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
