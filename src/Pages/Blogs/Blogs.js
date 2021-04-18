import React from 'react'
import './Blogs.css'
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import Blogitem from './Blogitem';
import Button from '@material-ui/core/Button';
import {useAuth} from '../../AuthContext'
import { useLocation } from 'react-router';

function Blogs() {
    const location = useLocation();
    const user = useAuth()
    return (
        <div style={{width:'100vw'}}>
        <div className="Blog__head">
            <h1>Find Blogs</h1>
        </div>
        <div className='search'>
            <div className="searchbox">
                <SearchIcon />
                <input type='text' placeholder="Search for Blogs"/>
            </div>
                <Button variant="filled" style={{background:'#699DFF',fontFamily:'Poppins, sans-serif',textTransform:'capitalize',color:'white',}}>
                    <FilterListIcon/> Apply Filter
                </Button>
        </div>
        <div className="Blogs">
            <Blogitem />
            <Blogitem />

         
        </div>
    </div>
    )
}

export default Blogs
