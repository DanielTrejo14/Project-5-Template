// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Navbar from './NavBar';
import Login from './Login';
import Register from './Register';
import RecipeList from './RecipeContainer/RecipeList';
import RecipeDetail from './RecipeContainer/RecipeDetail';
import CreateRecipe from './RecipeContainer/CreateRecipe';
import PrivateRoute from './PrivateRoute';
import CategoryList from './CategoryContainer/CategoryList';
import CategoryDetail from './CategoryContainer/CategoryDetail';
import CreateCategory from './CategoryContainer/CreateCategory';
import UpdateCategory from './CategoryContainer/UpdateCategory';
import About from './About';
import CategoryRecipes from './CategoryContainer/CategoryRecipes';
import EditRecipe from './RecipeContainer/EditRecipe';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/About" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/categories/:id" element={<CategoryDetail />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/categories/:id" element={<CategoryRecipes />} />
          <Route
            path="/recipes/create"
            element={
              <PrivateRoute>
                <CreateRecipe />
              </PrivateRoute>
            }
          />
          <Route
            path="/recipes/edit/:id"
            element={
              <PrivateRoute>
                <EditRecipe />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories/create"
            element={
              <PrivateRoute>
                <CreateCategory />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories/update/:id"
            element={
              <PrivateRoute>
                <UpdateCategory />
              </PrivateRoute>
            }
          />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;