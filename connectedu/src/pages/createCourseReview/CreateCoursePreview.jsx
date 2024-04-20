import React from 'react'
import { useState } from "react";
import "./CreateCoursePreview.scss";
import { useNavigate } from "react-router-dom";
import ConfirmationPopup from '../../components/confirmationPopup/ConfirmationPopup';

const CreateCoursePreview = () => {

    const [seen, setSeen] = useState(false)

    function togglePop() {
        setSeen(!seen);
    };

    let navigate = useNavigate();

    const routeBack = () => {
        let path = '/create-course-content';
        navigate(path);
    }

    return (
        <div className='createCourseContent'>
            <div className="container">
                <h1> Review Course Content</h1>
                <div className="sections">
                    <div className="left">
                        
                        <div className="courseImage">
                            <img src="/images/ConnectEduLogo-bg.png" alt="" />
                        </div>

                        <h3>We will explore the world of web development </h3>

                        <div className="stars">
                            <img src="/images/star.png" alt="" />
                            <img src="/images/star.png" alt="" />
                            <img src="/images/star.png" alt="" />
                            <img src="/images/star.png" alt="" />
                            <img src="/images/star.png" alt="" />
                            <span> 5 </span>
                        </div>

                        <div className="details">
                            <div className="item">
                                <img src="/images/clock.png" alt="" />
                                <span>10 Hours</span>
                            </div>
                            <div className="price">
                                <h2>$ 59.99 </h2>
                            </div>
                        </div>

                        <div className="courseDescription">
                            <h2>About this course</h2>

                            <p>
                                I use an AI program to create images based on text prompts. This
                                means I can help you to create a vision you have through a textual
                                description of your scene without requiring any reference images.
                                Some things I've found it often excels at are: Character portraits
                                (E.g. a picture to go with your DnD character) Landscapes (E.g.
                                wallpapers, illustrations to compliment a story) Logos (E.g. Esports
                                team, business, profile picture) You can be as vague or as
                                descriptive as you want. Being more vague will allow the AI to be
                                more creative which can sometimes result in some amazing images. You
                                can also be incredibly precise if you have a clear image of what you
                                want in mind. All of the images I create are original and will be
                                found nowhere else. If you have any questions you're more than
                                welcome to send me a message.
                            </p>
                        </div>

                        <div className="features">
                            <h2>What you will learn from this course?</h2>
                            <div className="item">
                                <img src="/images/greencheck.png" alt="" />
                                <span>Information Literacy</span>
                            </div>
                            <div className="item">
                                <img src="/images/greencheck.png" alt="" />
                                <span>Information Literacy</span>
                            </div>
                            <div className="item">
                                <img src="/images/greencheck.png" alt="" />
                                <span>Information Literacy</span>
                            </div>
                            <div className="item">
                                <img src="/images/greencheck.png" alt="" />
                                <span>Information Literacy</span>
                            </div>
                        </div>

                        <div className="createCourseNav">
                            <button onClick={routeBack}> Back </button>
                            <button onClick={togglePop} > Create </button>
                            {seen ? <ConfirmationPopup toggle={togglePop} /> : null}
                        </div>
                    </div>
                    <div className="right">
                        <div className="items">
                            <div className="item">
                                <img src={'/images/fill-check-mark.png'} alt="" />
                                <h3 htmlFor="">Course Information </h3>
                            </div>
                            <div className="item">
                                <img src={'/images/fill-check-mark.png'} alt="" />
                                <h3 htmlFor="">Course Content</h3>
                            </div>
                            <div className="item">
                                <img src={'/images/fill-check-mark.png'} alt="" />
                                <h3 htmlFor="">Course Preview</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCoursePreview