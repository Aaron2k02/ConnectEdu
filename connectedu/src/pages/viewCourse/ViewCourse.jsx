import React from 'react'
import './ViewCourse.scss'

const ViewCourse = () => {
  return (
      <div className='viewCourse'>
          <div className="container">
              <div className="item">
                  <video src={''} controls />
                  <div className="courseSectionDescription">
                      <h3>We will explore the world of web development </h3>
                      <h2>About this Section</h2>
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
                          <div className="box-item">
                              <div className="left-item">
                                  <img src={'/images/square-unfill-play-button.png'} alt="" />
                              </div>
                              <div className="right-item">
                                  <h2 className="section-title">lesson - 1 Portfolio Demo</h2>
                                  <div className="section-duration">
                                      <img src={'/images/clock.png'} alt="" />
                                      <p className="section-duration">12m 1s</p>
                                  </div>
                                  <button> Watch </button>
                              </div>
                          </div>
                          <hr />
                          <div className="box-item">
                              <div className="left-item">
                                  <img src={'/images/square-unfill-play-button.png'} alt="" />
                              </div>
                              <div className="right-item">
                                  <h2 className="section-title">lesson - 1 Portfolio Demo</h2>
                                  <div className="section-duration">
                                      <img src={'/images/clock.png'} alt="" />
                                      <p className="section-duration">12m 1s</p>
                                  </div>
                                  <button> Watch </button>
                              </div>
                          </div>
                          <hr />
                          <div className="box-item">
                              <div className="left-item">
                                  <img src={'/images/square-unfill-play-button.png'} alt="" />
                              </div>
                              <div className="right-item">
                                  <h2 className="section-title">lesson - 1 Portfolio Demo</h2>
                                  <div className="section-duration">
                                      <img src={'/images/clock.png'} alt="" />
                                      <p className="section-duration">12m 1s</p>
                                  </div>
                                  <button> Watch </button>
                              </div>
                          </div>
                          <hr />
                          <div className="box-item">
                              <div className="left-item">
                                  <img src={'/images/square-unfill-play-button.png'} alt="" />
                              </div>
                              <div className="right-item">
                                  <h2 className="section-title">lesson - 1 Portfolio Demo</h2>
                                  <div className="section-duration">
                                      <img src={'/images/clock.png'} alt="" />
                                      <p className="section-duration">12m 1s</p>
                                  </div>
                                  <button> Watch </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default ViewCourse