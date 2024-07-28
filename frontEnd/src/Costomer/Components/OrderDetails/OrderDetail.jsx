import React, { useContext, useEffect, useState } from 'react'
import Filter from './OrderFilter/Filter'
import OrderData from './OrderDetail/Order.data'
import axios from 'axios'
import Ratting from '../RattingCard/Ratting'
import RatingComponent from '../RatttingProduct/Ratting';
import { toastContext } from '../../../Context-Api/Context'

const OrderDetail = () => {
  let { settoggleReview } = useContext(toastContext)
  const [myorders, setmyorders] = useState([])
  const [selectedStatus, setSelectedStatus] = useState('');
  let userId = JSON.parse(localStorage.getItem("user"))
  console.log(userId)
  let filterData = myorders?.filter((elem) => {
    return elem?.deliveryStatus?.includes(selectedStatus)
  })
  const [isShowRatting, setisShowRatting] = useState(false)
  const [productId, setproductId] = useState(null)
  const handleData = (productId) => {
    
    setproductId(productId)
    setisShowRatting(true)

  }
  const handleRatting = async (rattng, reviews) => {
    try {
      let res = await axios.post(`https://ecommerce-api-one-iota.vercel.app/product/reviews/${productId}`, { rattng, reviews, userId: userId._id })

      if (res.data) {
        settoggleReview((prev) => !prev)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  const myOrder = async () => {
  try {
    let allData = await axios.post("https://ecommerce-api-one-iota.vercel.app/order/myorders", { userId: userId._id })
console.log(allData)
    setmyorders(allData.data)
  } catch (error) {
    console.log(error.message)
  }
  }
  useEffect(() => {
    myOrder()

  }, [])

  return (
    <div className='p-4 relative justify-between h-screen '>

      <div className='fixed'>
        <Filter selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} />
      </div>

      <div className='absolute right-5 top-0 w-[70%] '>
        {filterData?.map((order, index) => (
          <div key={index}>
            {order?.orderData?.map((data, dataIndex) => (
              <OrderData isShowRatting={isShowRatting} setisShowRatting={setisShowRatting} handleData={handleData} key={dataIndex} createdAt={order?.createdAt} deliveryStatus={order?.deliveryStatus} data={data} />
            ))}
          </div>
        ))}

        <RatingComponent handleRatting={handleRatting} isShowRatting={isShowRatting} setisShowRatting={setisShowRatting} />

      </div>

    </div>
  )
}

export default OrderDetail
