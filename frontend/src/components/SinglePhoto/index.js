// frontend/src/components/LoginFormPage/index.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserPhotos } from "../../store/photo";
import { useHistory } from 'react-router-dom';
import './SinglePhoto.css';

function SinglePhoto() {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user)
    const photos = useSelector(state => state.photo)

    var url = window.location.pathname;
    console.log(url)


    return (
        <>
            <div className='photos-container'>
                <div className='select-photos'>
                    {photos.map(photo => (
                        < div className='photo-div' >
                            <div
                                className='photo-image'
                                style={{ backgroundImage: `url('${photo.photoUrl}')` }}
                            ></div>
                            <div className='photo-info'>
                                <div className='photo-user-name'>{photo.name} by {photo.User.username}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )


}
export default SinglePhoto;