import React from 'react'
import './ViewCourse.scss'
import ViewCourseSection from '../../components/viewCourseSection/ViewCourseSection'

const ViewCourse = () => {
  return (
      <div className='viewCourse'>
          <div className="container">
              <div className="item">
                  <video src={''} controls />
                  <div className="courseSectionDescription">
                      <div className="courseTitle">
                          <img src={'/images/square-fill-play-button.png'} alt="" />
                          <h3>We will explore the world of web development </h3>
                      </div>
                      <div className="courseDescription">
                        <div className="courseAbout">
                            <img src={'/images/about-course-icon.png'} alt="" />
                            <h2>About Course Section</h2>
                        </div>
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
                  </div>
                  <div className="write">
                      <textarea name="" placeholder="Ask a question" cols="30" rows="10"></textarea>
                      <button>Send</button>
                  </div>
              </div>
              <div className="item">
                  <div className="box">
                      <div className="box-items">
                          <div className="box-header">
                              <img src={'/images/square-fill-play-button.png'} alt="" />
                              <span className="desc">Course Navigation Pane</span>
                          </div>
                          <ViewCourseSection />
                          <ViewCourseSection />
                          <ViewCourseSection />
                          <ViewCourseSection />
                          <ViewCourseSection />
                          <ViewCourseSection />
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default ViewCourse