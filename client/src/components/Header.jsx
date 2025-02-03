import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
export default function Header() {
  const {currentuser}=useSelector(state=>state.user);
  const[searchTerm,setsearchTerm]=useState('');
  const navigate=useNavigate();

  const handleSubmitSearch=(e)=>
  {
    e.preventDefault();
    const urlParams=new URLSearchParams(window.location.search);
    urlParams.set('searchTerm',searchTerm);
    const searchQuery=urlParams.toString();
    navigate(`/search?${searchQuery}`);

  }
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl !== null) {
      setsearchTerm(searchTermFromUrl);
    } else {
      setsearchTerm(''); // ✅ Clears input when no query
    }
  }, [location.search]); // ✅ Re-run when URL changes
  
  return (
    <header className='bg-slate-200 shadow-md'>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
    <Link to='/'>
    <h1 className='font-bold  text-sm sm:text-xl flex flex-wrap '>
            <span className='text-slate-500'>Sahand</span>
            <span className='text-slate-700'>Estate</span>
        </h1>
    </Link>
    
        <form className='bg-slate-100 p-3 rounded-lg flex items-center' onSubmit={handleSubmitSearch}>
            <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' onChange={(e)=>setsearchTerm(e.target.value)} value={searchTerm}/>
            <button><FaSearch className='text-slate-600'/></button>
            
        </form>
        <ul className='flex gap-4'>
        <Link to='/'> <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li></Link>
           <Link to='/about'><li className='hidden sm:inline text-slate-700 hover:underline'>About</li></Link> 
           <Link to='/profile'> 
           {
            currentuser ? (<img  className='rounded-full h-7 w-7 object-cover'src={currentuser.avatar} alt='profile'/>):<li className='sm:inline text-slate-700 hover:underline'>Sign in</li>
           }
            </Link>
          
        </ul>
    </div>
        
    </header>
  )
}
