import React from 'react'
import ProgressBar from './ProgressBar'
import './LearnCard.scss'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import StarBorderSharpIcon from '@mui/icons-material/StarBorderSharp';
import { Link } from 'react-router-dom';

const LearnCard = ({ item }) => {

    const handleReadMoreClick = (courseId) => {
        navigate(`/course/${courseId}`);
    };

    return (
        <div className='learnCard'>
            <Link to={`/viewCourse/${item._id}`} className='link'>
                <div className='imgCard'>
                    <img src={item.thumbnailUrl[0]} alt="" />
                </div>

                <div className='title'>
                    <span>{item.title}</span>
                    {/* <ProgressBar/> */}
                </div>

                <div className='bottom'>
                    <div className='review'>
                        <button onClick={() => handleReadMoreClick(item._id)} className='link starLink' >Leave a rating</button>
                        <div className='stars'>
                            <StarBorderSharpIcon />
                            <StarBorderSharpIcon />
                            <StarBorderSharpIcon />
                            <StarBorderSharpIcon />
                            <StarBorderSharpIcon />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default LearnCard;
