import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useReducer } from 'react'
import Layout from '../../components/Layout'
import { getError } from '../../utils/error';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state
  }
}
function OrderScreen() {
  const { query } = useRouter()
  const orderId = query.id

  const [{ loading, error, order, /* successPay, loadingDeliver, successDeliver */ },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  })
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' })
        const { data } = await axios.get(`/api/orders/${orderId}`)
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
      }
    }
    if (!order._id || (order._id && order._id !== orderId)) {

      fetchOrder()
    }
  }, [orderId, order])

  return (
    <Layout title={`Pedido ${orderId}`}>
      <h1>{}</h1>
    </Layout>
  )
}

OrderScreen.auth = true
export default OrderScreen
