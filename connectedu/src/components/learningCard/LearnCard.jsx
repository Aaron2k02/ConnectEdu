import React from 'react';
import ProgressBar from './ProgressBar';
import './LearnCard.scss';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import StarBorderSharpIcon from '@mui/icons-material/StarBorderSharp';
import { Link, useNavigate } from 'react-router-dom';

const LearnCard = ({ item }) => {
    const navigate = useNavigate();

    const handleReadMoreClick = (courseId) => {
        navigate(`/course/${courseId}`);
    };

    const truncatedTitle = item.title.length > 15 ? `${item.title.substring(0, 15)}...` : item.title;

    return (
        <div className='learnCard'>
            <Link to={`/viewCourse/${item._id}`} className='link'>
                <div className='imgCard'>
                    <img src={item.thumbnailUrl[0]} alt="" />
                </div>

                <div className='title'>
                    <span>{truncatedTitle}</span>
                </div>

                <div className='bottom'>
                    <div className='review'>
                        <button onClick={() => handleReadMoreClick(item._id)} className='link starLink'>Leave a rating</button>
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
