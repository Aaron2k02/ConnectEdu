import React, { useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./SlideShow.scss";

const SlideShow = ({ data }) => {
    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        setSlide(slide === data.length - 1 ? 0 : slide + 1);
    };

    const prevSlide = () => {
        setSlide(slide === 0 ? data.length - 1 : slide - 1);
    };

    return (
        <div className="slideshow">
            <div className="container">
                <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
                {data.map((item, idx) => (
                    <img
                        src={item}
                        alt={`Slide ${idx + 1}`}
                        key={idx}
                        className={slide === idx ? "slide" : "slide slide-hidden"}
                    />
                ))}
                <BsArrowRightCircleFill onClick={nextSlide} className="arrow arrow-right" />
                <span className="indicators">
                    {data.map((_, idx) => (
                        <button
                            key={idx}
                            className={slide === idx ? "indicator" : "indicator indicator-inactive"}
                            onClick={() => setSlide(idx)}
                        ></button>
                    ))}
                </span>
            </div>
        </div>
    );
};

export default SlideShow;
