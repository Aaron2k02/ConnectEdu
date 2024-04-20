import React from 'react'
import ProgressBar from './ProgressBar'
import './LearnCard.scss'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import { Link } from 'react-router-dom';
import StarBorderSharpIcon from '@mui/icons-material/StarBorderSharp';
const LearnCard = ({item}) => {
  return (
    <div className='learnCard'>
    <div className='imgCard'>
        <img src={item.img} alt="" />
    </div>
    <div className='title'>
        <span>{item.title}</span>
        <ProgressBar/>
    </div>
    

    <div className='bottom'>
    <Link className='view' to=''>
        <span>Continue</span>
        <ArrowForwardOutlinedIcon/>
    </Link>

    <div className='review'>
        <Link className='starLink'>Leave a rating</Link>
        <div className='stars'>
        <StarBorderSharpIcon/>
        <StarBorderSharpIcon/>
        <StarBorderSharpIcon/>
        <StarBorderSharpIcon/>
        <StarBorderSharpIcon/>
        </div>
    </div>

    </div>
   
</div>
  )
}

export default LearnCard
