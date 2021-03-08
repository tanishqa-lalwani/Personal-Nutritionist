import React from 'react'
import './Food.css'
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';



function Food() {
    return (
        <div style={{width:'100vw'}}>
        <div className="food__head">
            <h1>Find nutrients in your food</h1>
        </div>
        <p style={{
            padding:'0 50px',
            paddingBottom:'5px',
            paddingTop:'15px',
        }}>Search any food item to find it’s nutrient contents </p>
        <div className='search'>
            <div className="searchbox">
                <SearchIcon />
                <input type='text' placeholder="Type food item"/>
            </div>
            <Button variant="filled" style={{background:'#699DFF',fontFamily:'Poppins, sans-serif',textTransform:'capitalize',color:'white',}}>
                    <FilterListIcon/> Apply Filter
                </Button>
        </div>
    </div>
    )
}

export default Food
