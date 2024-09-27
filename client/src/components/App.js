import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Recipes from './Recipes';
import PrivateRoute from './PrivateRoute';
import RecipeList from './RecipeContainer/RecipeList';
import RecipeDetail from './RecipeContainer/RecipeDetail';
import CreateRecipe from './RecipeContainer/CreateRecipe';
import Navbar from './NavBar';
import { AuthProvider } from './AuthContext';




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login">
            <Login setIsAuthenticated={setIsAuthenticated} />
          </Route>
          <Route path="/register" component={Register} />
          <PrivateRoute
            path="/recipes/create"
            component={CreateRecipe}
            isAuthenticated={isAuthenticated}
          />
          <Route path="/recipes/:id" component={RecipeDetail} />
          <Route path="/recipes" component={RecipeList} />
          <Route exact path="/" component={RecipeList} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
