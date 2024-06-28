import React from 'react'
import { Avatar, Box, Grid } from '@mui/material'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Rating from '@mui/material/Rating';


const RattingBar = () => {
  return (
 <div className='flex justify-center items-center'>
       <div>
      <Grid >
  <h1>Product Rattings</h1>
<Box sx={{gap:2}} >
<Rating  style={{fontSize:"15px"}}  readOnly  className='h-fit leading-none' name="haif-rating"  value={2.5}  />
  <div className='flex items-center justify-between gap-1 '>


  <p className='text-[14px]'>Excellent</p>
  <br />
      <LinearProgress className="min-w-[17vw]" variant="determinate" color='success' value={100} />
      <p className='text-xs opacity-80'>18999</p>
  </div>

   
  <div className='flex items-center justify-between'>

  <p className='text-[14px]'>Good </p>
 
      <LinearProgress className='min-w-[17vw]'  variant="determinate" value={70} />
      <p className='text-xs opacity-80'>18999</p>
  </div>
  <div className='flex items-center  justify-between'>

  <p className='text-[14px]'>Avarage</p>
  <br />
      <LinearProgress className='min-w-[17vw]' variant="determinate" color='warning' value={40} />
      <p className='text-xs opacity-80'>18999</p>
  </div>
  <div className='flex items-center justify-between '>

  <p className='text-[14px]'>Poor</p>
  <br />
      <LinearProgress className='min-w-[17vw]' color='error' variant="determinate" value={10} />
      <p className='text-xs opacity-80'>18999</p>
  </div>
</Box>

</Grid>
    </div>
 </div>
  )
}

export default RattingBar
