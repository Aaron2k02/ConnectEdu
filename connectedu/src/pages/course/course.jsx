import React from 'react'
import { useState } from 'react'
import './course.scss'
// import Slide from '../../components/Slide/Slide'
import SlideShow from '../../components/slideshow/SlideShow';
import {slideImages} from '../../data/coursesDetail';
import ReviewForm from '../../components/ReviewForm/ReviewForm';

/** ----------------- MUQRI CODE ------------------------- */
// import components
import PayButton from "../../components/PayButton/PayButton"

// dummy data for the cartItems
const cartItems = [
  {id:1, name:"Mobile App Development",price: 59.99, cartQuantity: 1, image: "https://i.imgur.com/2xH1X44.png" ,desc: "We will explore the world of web development"},
];

// Define the cart object
const cart = {cartItems};

/** ----------------- MUQRI CODE ------------------------- */

const Course = () => {

  const [seen, setSeen] = useState(false)

  function togglePop() {
    setSeen(!seen);
  };

  return (
    <div className='course'>
      <div className="container">
        <div className="left">
          <span className="breadCrumbs"> ConnectEdu &gt; Information System </span>

          <h1>We will explore the world of web development </h1>

          <div className="user">
            <img src="" alt="" />
            <span>John Doe</span>
            <div className="stars">
              <img src="/images/star.png" alt="" />
              <img src="/images/star.png" alt="" />
              <img src="/images/star.png" alt="" />
              <img src="/images/star.png" alt="" />
              <img src="/images/star.png" alt="" />
              <span> 5 </span>
            </div>
          </div>

          <SlideShow data={slideImages} className='slider' />

          <h2>About This Course</h2>

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
          <div className="seller">
            <h2>About The Seller</h2>
            <div className="user">
              <img
                src="https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <div className="info">
                <span>
                  John Doe
                </span>
                <div className="stars">
                  <img src="/images/star.png" alt="" />
                  <img src="/images/star.png" alt="" />
                  <img src="/images/star.png" alt="" />
                  <img src="/images/star.png" alt="" />
                  <img src="/images/star.png" alt="" />
                  <span> 5 </span>
                </div>
                <button> Details </button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">USA</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>
                My name is Anna, I enjoy creating AI generated art in my spare
                time. I have a lot of experience using the AI program and that
                means I know what to prompt the AI with to get a great and
                incredibly detailed result.
              </p>
            </div>
            <div className="write">
              <textarea name="" placeholder="Ask a question" cols="30" rows="10"></textarea>
              <button>Send</button>
            </div>
          </div>
          <div className="reviewHeader">
            <h2>Reviews</h2>
            <button onClick={togglePop} >Add Review</button>
            {seen ? <ReviewForm toggle={togglePop} /> : null}
          </div>
          <div className="reviews">
            <div className="item">
              <div className="user">
                <img
                  className="pp"
                  src="https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="" />
                <div className="info">
                  <span>John Doe</span>
                  <div className="country">
                    <img src="https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
                    <span>Malaysia</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src="/images/star.png" alt="" />
                <img src="/images/star.png" alt="" />
                <img src="/images/star.png" alt="" />
                <img src="/images/star.png" alt="" />
                <img src="/images/star.png" alt="" />
                <span> 5 </span>
              </div>
              <p>
                I just want to say that art_with_ai was the first, and after
                this, the only artist Ill be using on Fiverr. Communication was
                amazing, each and every day he sent me images that I was free to
                request changes to. They listened, understood, and delivered
                above and beyond my expectations. I absolutely recommend this
                gig, and know already that Ill be using it again very very soon
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src="/images/like.png" alt="" />
                <span>Yes</span>
                <img src="/images/dislike.png" alt="" />
                <span>No</span>
              </div>
            </div>
            <hr />
            <div className="item">
              <div className="user">
                <img
                  className="pp"
                  src="https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="" />
                <div className="info">
                  <span>John Doe</span>
                  <div className="country">
                    <img src="https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
                    <span>Malaysia</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src="/images/star.png" alt="" />
                <img src="/images/star.png" alt="" />
                <img src="/images/star.png" alt="" />
                <img src="/images/star.png" alt="" />
                <img src="/images/star.png" alt="" />
                <span> 5 </span>
              </div>
              <p>
                I just want to say that art_with_ai was the first, and after
                this, the only artist Ill be using on Fiverr. Communication was
                amazing, each and every day he sent me images that I was free to
                request changes to. They listened, understood, and delivered
                above and beyond my expectations. I absolutely recommend this
                gig, and know already that Ill be using it again very very soon
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src="/images/like.png" alt="" />
                <span>Yes</span>
                <img src="/images/dislike.png" alt="" />
                <span>No</span>
              </div>
            </div>
            <hr />
            <div className="item">
              <div className="user">
                <img
                  className="pp"
                  src="https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="" />
                <div className="info">
                  <span>John Doe</span>
                  <div className="country">
                    <img src="https://images.pexels.com/photos/1054777/pexels-photo-1054777.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" />
                    <span>Malaysia</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src="/images/star.png" alt="" />
                <img src="/images/star.png" alt="" />
                <img src="/images/star.png" alt="" />
                <img src="/images/star.png" alt="" />
                <img src="/images/star.png" alt="" />
                <span> 5 </span>
              </div>
              <p>
                I just want to say that art_with_ai was the first, and after
                this, the only artist Ill be using on Fiverr. Communication was
                amazing, each and every day he sent me images that I was free to
                request changes to. They listened, understood, and delivered
                above and beyond my expectations. I absolutely recommend this
                gig, and know already that Ill be using it again very very soon
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src="/images/like.png" alt="" />
                <span>Yes</span>
                <img src="/images/dislike.png" alt="" />
                <span>No</span>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="price">
            <h3>I teach Information System</h3>
            <h2>$ 59.99 </h2>
          </div>
          <p>
            I will teach on how to study information system
          </p>
          <div className="details">
            <div className="item">
              <img src="/images/clock.png" alt="" />
              <span>2 classes per week</span>
            </div>
            <div className="item">
              <img src="/images/recycle.png" alt="" />
              <span>3 Iteration of Dicussion</span>
            </div>
          </div>
          <div className="features">
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
          <PayButton cartItems ={cart.cartItems} />
          <button>Print Certification</button>
        </div>
      </div>
    </div>
  )
}

export default Course