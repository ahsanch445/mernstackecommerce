import React, { useEffect, useState } from 'react'
import { Avatar, Box, Grid } from '@mui/material'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Rating from '@mui/material/Rating';


const RattingBar = ({product,ratting}) => {
  const [excellent, setExcellent] = useState(0);
  const [good, setGood] = useState(0);
  const [poor, setPoor] = useState(0);
const [average, setaverage] = useState(0)
  useEffect(() => {
    let excellentCount = 0;
    let goodCount = 0;
    let poorCount = 0;
let avvCount = 0;
    ratting.forEach((elem) => {
      if (elem.rating >= 4 && elem.rating <= 5) {
        excellentCount++;
      } else if (elem.rating >= 3 && elem.rating < 4) {
        goodCount++;
      } 
      else if (elem.rating >= 3 && elem.rating < 2.5) {
        avvCount++;
      } 
      else if (elem.rating >= 1 && elem.rating < 2.5) {
        poorCount++;
      }
    });

    setExcellent(excellentCount);
    setGood(goodCount);
    setPoor(poorCount);
    setaverage(avvCount)
  }, [ratting]);
  console.log("Excellent: ", excellent);
  console.log("Good: ", good);
  console.log("Poor: ", poor);
  return (
 <div className='flex justify-center items-center'>
       <div>
      <Grid >
  <h1>Product Rattings</h1>
<Box sx={{gap:2}} >
<Rating  style={{fontSize:"15px"}}  readOnly  className='h-fit leading-none' name="haif-rating"  value={product}  />
  <div className='flex items-center justify-between gap-1 '>


  <p className='text-[14px]'>Excellent</p>
  <br />
      <LinearProgress className="min-w-[17vw]" variant="determinate" color='success' value={excellent*10} />
      <p className='text-xs opacity-80'>{
        excellent
}</p>
  </div>

   
  <div className='flex items-center justify-between'>

  <p className='text-[14px]'>Good </p>
 
      <LinearProgress className='min-w-[17vw]'  variant="determinate" value={good*10} />
      <p className='text-xs opacity-80'>{good}</p>
  </div>
  <div className='flex items-center  justify-between'>

  <p className='text-[14px]'>Avarage</p>
  <br />
      <LinearProgress className='min-w-[17vw]' variant="determinate" color='warning' value={average*10} />
      <p className='text-xs opacity-80'>{average}</p>
  </div>
  <div className='flex items-center justify-between '>

  <p className='text-[14px]'>Poor</p>
  <br />
      <LinearProgress className='min-w-[17vw]' color='error' variant="determinate" value={poor*10} />
      <p className='text-xs opacity-80'>{poor }</p>
  </div>
</Box>

</Grid>
    </div>
 </div>
  )
}

export default RattingBar
