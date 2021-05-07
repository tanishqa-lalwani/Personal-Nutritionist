import React, {useEffect} from 'react'
import './Blogs.css'
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import Blogitem from './Blogitem copy';
import Button from '@material-ui/core/Button';
import {useAuth} from '../../AuthContext'
import { useLocation } from 'react-router';
import { db } from '../../firebase';

function Blogs() {

    const [blogs, setblogs] = React.useState([]);
    const [search,setSearch] = React.useState("");
    useEffect(() => {
        db.collection('Users').doc('Nutritionist').collection('blogs').orderBy('date','desc').onSnapshot(
            (snapsht) => {
              setblogs(
                snapsht.docs.map((docs) => ({
                  id: docs.id,
                  data: docs.data(),
                })))
            }
          )    
    }, [])

    const searchBlog = (title) => {
        setSearch(title)
        db.collection('Users').doc('Nutritionist').collection('blogs')
        .orderBy('title')
        .startAt(title)
        .endAt(title + '\uf8ff').onSnapshot(
            (snapsht) => {
              setblogs(
                snapsht.docs.map((docs) => ({
                  id: docs.id,
                  data: docs.data(),
                })))
            }
          )
    }

    return (
        <div style={{width:'100vw'}}>
        <div className="Blog__head">
            <h1>Find Blogs</h1>
        </div>
        <div className='search'>
            <div className="searchbox">
                <input type='text' placeholder="Search for Blogs" value={search} onChange={(e) => searchBlog(e.target.value)}/>
                <Button >
                    <SearchIcon /> 
                </Button>
            </div>
                <Button variant="filled" style={{background:'#699DFF',fontFamily:'Poppins, sans-serif',textTransform:'capitalize',color:'white',}}>
                    <FilterListIcon/> Apply Filter
                </Button>
        </div>
        <div className="Blogs">
            {
                blogs?.length !== 0 && blogs.map(({id,data})=> (
                    <Blogitem 
                    key={id} 
                    id={id}
                    nutriName={data.name} 
                    nutriOccupation={data.occupation} 
                    tags={data.tags} 
                    title={data.title} 
                    date={data.date}
                    description={data.short_desc} 
                    img={data.image}/>
                ))
            }
        </div>
    </div>
    )
}

export default Blogs
