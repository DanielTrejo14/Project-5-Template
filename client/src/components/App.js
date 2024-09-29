import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import RecipeList from './RecipeContainer/RecipeList';
import RecipeDetail from './RecipeContainer/RecipeDetail';
import CreateRecipe from './RecipeContainer/CreateRecipe';
import Navbar from './NavBar';
import { AuthProvider } from './AuthContext';
import Register from './Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/recipes/create"
            element={<PrivateRoute isAuthenticated={isAuthenticated} component={CreateRecipe} />}
          />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/" element={<RecipeList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
