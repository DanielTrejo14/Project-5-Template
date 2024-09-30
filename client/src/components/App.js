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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" component={RecipeList} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/recipes/create" component={CreateRecipe} />
          <PrivateRoute path="/categories/create" component={CreateCategory} />
          <PrivateRoute path="/categories/update/:id" component={UpdateCategory} />
          <Route path="/categories/:id" component={CategoryDetail} />
          <Route path="/categories" component={CategoryList} />
          <Route path="/recipes/:id" component={RecipeDetail} />
          <Route path="/recipes" component={RecipeList} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
