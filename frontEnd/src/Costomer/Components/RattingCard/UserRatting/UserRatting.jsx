import React from 'react'
import { Avatar, Box, Grid } from '@mui/material'
import Rating from '@mui/material/Rating';
const UserRatting = () => {
  return (
    <div >
        <br />
        <hr />

    <Grid    container spacing={7}>
<Grid item xs={1}>
<Box className='mt-2'>
    <Avatar className='text-white  ' sx={{width:44,height:44,bgcolor:'#9155fd'}}>
R
    </Avatar>
</Box>
</Grid>
<Grid item sx={4} gap={6}>
   <div className='space-y-2'>
   <div>
        <p className='font-semibold'>
            Ahsan 
        </p>
        <p className="opacity-80">
            April,4,2024
        </p>
        <Rating   style={{fontSize:"20px"}} readOnly  className='h-fit  leading-none' name="haif-rating"  value={2.5}  />
        <h3  className=' opacity-85 leading-none'>nice product i ever purchase</h3>
    </div>
   </div>
   
   
</Grid>

      </Grid>

    </div>
  )
}

export default UserRatting
