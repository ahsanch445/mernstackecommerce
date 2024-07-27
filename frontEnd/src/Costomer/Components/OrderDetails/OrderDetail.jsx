import React, { useContext, useEffect, useState } from 'react'
import Filter from './OrderFilter/Filter'
import OrderData from './OrderDetail/Order.data'
import axios from 'axios'
import Ratting from '../RattingCard/Ratting'
import RatingComponent from '../RatttingProduct/Ratting';
import { toastContext } from '../../../Context-Api/Context'

const OrderDetail = () => {
return(
  <h1 className='text-4xl'>hello from my order</h1>
)
}

export default OrderDetail
