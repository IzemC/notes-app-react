import React, { useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Error from './Pages/404/404Error';
import Profile from './Pages/Profile/Profile';
import AuthContext from './contexts/authContext'
import './App.css'
function App() {
  const authToken = localStorage.getItem('authToken')
  const [authState, setAuthState] = useState({
    isAuth: Boolean(authToken),
    token: authToken
  });

  return (
    <AuthContext.Provider value={{
      authState,
      setAuthState
    }}>
      <Switch>
        <Route exact path='/' > {authState.isAuth ? <Home /> : <Redirect to='/login' />} </Route>
        <Route path='/profile'>  {authState.isAuth ? <Profile /> : <Redirect to='/login' />} </Route>
        <Route path='/login'> {authState.isAuth ? <Redirect to='/' /> : <Login />}  </Route>
        <Route path='/signup'>  {authState.isAuth ? <Redirect to='/' /> : <Signup />} </Route>
        <Route path='' >  <Error /> </Route>
      </Switch>
    </AuthContext.Provider>

  )
}

export default App