import { Avatar, Box, Grid } from '@mui/material'
import React from 'react'
import Rating from '@mui/material/Rating';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import UserRatting from './UserRatting/UserRatting';
import RattingBar from './RattingBar/RattingBar';
import { KurtaData } from '../../Data/KurtaData';
import Card from '../HomeCard/Card';

const Ratting = () => {
 
  return (
    <>
    
    <div className='  flex '>
    <div className='w-1/2'>

   <UserRatting/>
  
    </div>

<div className='w-1/2 '>
<RattingBar/>

</div>
    
    </div>
    <hr />
    {/* //similair product */}
    <div>
      
      <h1 className='font-semibold '>
        Smiliar Product
      </h1>
   
      <div  className='flex mt-3 flex-wrap justify-center space-y-3 gap-3 cursor-pointer'>
      {KurtaData.map((e,index)=><Card key={index} data={e} />)}
      </div>
    </div>
    </>
  )
}

export default Ratting
