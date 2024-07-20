import React from 'react'
import { Avatar, Box, Grid } from '@mui/material'
import Rating from '@mui/material/Rating';
import moment from 'moment'
const UserRatting = ({data}) => {
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
    {data?.userId?.fullname}
        </p>
        <p className="opacity-80">
            {moment(data?.createdAt).fromNow()}
        </p>
        <Rating   style={{fontSize:"20px"}} readOnly  className='h-fit  leading-none' name="haif-rating"  value={data.rating}  />
        <h3  className=' opacity-85 leading-none'>{data?.review}</h3>
    </div>
   </div>
   
   
</Grid>

      </Grid>

    </div>
  )
}

export default UserRatting
