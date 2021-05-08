import React, { useEffect, useState } from 'react';
import './FullBlog.css'
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { Avatar } from '@material-ui/core';
import yellow from '../../Images/avatar_yellow.png'
import img from './image 10.png'
import { db } from '../../firebase'
import NutitionistCard from './NutitionistCard';


function FullBlog(props) {

    const [data, setdata] = useState([])
    const [tags,setT] = useState([])

    useEffect(() => {
        db.collection('Users').doc('Nutritionist').collection('blogs').doc(props.match.params.blogid).onSnapshot(snap => {
            setdata(snap.data());setT(snap.data().tags)})
    }, [data?.length])

    return (
        <div className="full__blogs">
            <div style={{ width: '100vw' }}>
                <div className="Blog__head__change">
                    <h1>{data?.title}</h1>
                    <BookmarkIcon className="icon__style" fontSize="large" />

                </div>
            </div>

            <div className="full__blogs__content">
                <div className="full__blogs__main">
                    <div className="full__blogs__info">
                        <h4 className="date">{data?.date} </h4>
                        <p className="full__blogs__title" style={{marginTop:'20px'}}
                        dangerouslySetInnerHTML={{__html: data.long_desc}}
                        ></p>

                        <div style={{ display: 'flex', gap: '20px', margin:'20px 0',alignItems: 'center', flexWrap: 1 }}>
                            { 
                                tags?.map((i) => (
                                    <div className="full__blogs__tags"><h3>{i}</h3></div>
                                ))
                            }
                        </div>
                    </div>
                    <NutitionistCard uid={data?.uid}/>
                    {/* </div> */}
                </div>
                <div className="full__image">
                    <img className="full__blog__image" src={data.image} />
                </div>

            </div>

        </div>
    );
}

export default FullBlog;