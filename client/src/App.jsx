import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Signin from './pages/Signin.jsx';
import SignUp from './pages/SignUp.jsx';
import About from './pages/About.jsx';
import Profile from './pages/Profile';
import Header from './components/Header.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import CreateListing from './pages/CreateListing.jsx';
import EditListing from './pages/EditListing.jsx';
import Listing from './pages/Listing.jsx';
import Search from './pages/Search.jsx';
export default function App() {


  return (
<BrowserRouter>
<Header />
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/sign-in' element={<Signin />}/>
    <Route path='/sign-up' element={<SignUp />}/>
    <Route path='/about' element={<About />}/>
    <Route path='/listing/:listingId' element={<Listing/>}/>
    <Route path='/search' element={<Search/>}/>
    <Route  element={<PrivateRoute />}>
    <Route   path='/profile' element={<Profile />}/>
    <Route   path='/create-listing' element={<CreateListing/>}/>
    <Route path='/update-listing/:id' element={<EditListing/>}/>
    </Route>
   

  </Routes>
</BrowserRouter>
  )
}
