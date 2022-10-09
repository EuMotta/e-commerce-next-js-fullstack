import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useEffect, useReducer } from 'react'
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

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    descount,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,

  } = order

  return (
    <Layout title={`Pedido ${orderId}`}>
      <h1>{`Id: ${orderId}`}</h1>
      {loading ? (
        <div>Carregando...</div>
      ) : (error ? (
        <div className='alert-error'>{error}</div>
      ) : (
        <div className='grid md:grid-cols-4 md:gap-5'>
                    <div className='overflow-x-auto md:col-span-3'>
                        <div className='card p-5 m-2 text-2xl text-indigo-500 text-center '> <h2>Lista de produtos</h2>
                            <table className='min-w-full'>
                                <thead className='border-y border-indigo-800'>
                                    <tr className='text-indigo-800 text-1xl'>
                                        <th className="px-5 text-center">Item</th>
                                        <th className="p-5 text-center">Quantidade</th>
                                        <th className="p-5 text-center">Preço</th>
                                        <th className="p-5 text-center">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItems.map((item) => (
                                        <tr key={item._id} className='border-y   border-indigo-700'>
                                            <td className='m-5'>
                                                <Link href={`/product/${item.slug}`} >
                                                    <Image src={item.image} alt={item.name} width={50} height={50}></Image>
                                                </Link>
                                            </td>
                                            <td className="p-5 text-black only:text-center">{item.quantity}</td>
                                            <td className="p-5 text-black text-center">R${item.price}</td>
                                            <td className="p-5 text-black text-center">
                                                R${item.quantity * item.price}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                            <div className='text-end mr-16 pr-2'>R$:{itemsPrice}</div>
                        </div>
                        <div className='grid ml-12 mx-2 grid-cols-2'>
                            <div>
                                <div className='card p-5'>
                                    <h2 className='text-center text-2xl text-indigo-800'>Endereço de entrega</h2>
                                    <div className=' items-left grid grid-cols-2 gap-4 flex-col  mb-2'>
                                        <div className="col-span-1">
                                            <div className='text-indigo-800'>Nome:&nbsp;
                                                <span className='text-black'>{shippingAddress.name}</span>
                                            </div>
                                            <div className='text-indigo-800 gap'>Endereço:&nbsp;
                                                <span className='text-black'>{shippingAddress.address}</span>
                                            </div>
                                            <div className='text-indigo-800'>Bairro:&nbsp;
                                                <span className='text-black'>{shippingAddress.neighborhood}</span>
                                            </div>
                                            <div className='text-indigo-800'>Cidade:&nbsp;
                                                <span className='text-black'>{shippingAddress.city}</span>
                                            </div>
                                        </div>
                                        <div className=' col-span-1 ml-10'>
                                            <div className='text-indigo-800'>CEP:&nbsp;
                                                <span className='text-black'>{shippingAddress.postalCode}</span>
                                            </div>
                                            <div className='text-indigo-800'>Número:&nbsp;
                                                <span className='text-black'>{shippingAddress.number}</span>
                                            </div>
                                            <div className='text-indigo-800'>Estado:&nbsp;
                                                <span className='text-black'>{shippingAddress.state}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Link href='/shipping'>
                                            <button className='cursor-pointer  w-full'>
                                                Editar
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className='card p-5 mx-10   w-auto'>
                                
                                <h2 className="mb-2 text-center text-2xl text-indigo-800">Método de pagamento</h2>
                                <div className="mt-8    text-center text-xl ">
                                    <Link href='/payment'>
                                        <span className='border border-indigo-800 shadow-sm bg-slate-100 hover:cursor-pointer hover:bg-slate-50 shadow-slate-900 p-3'>
                                            {paymentMethod}
                                        </span>
                                    </Link>
                                </div>
                                <div className="mt-10 grid text-center text-xl">
                                    <Link href='/payment'>
                                        <button className='cursor-pointer w-full'>
                                            Editar
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className='card p-5 mt-2'>
                            <h2>Resumo do Pedido:</h2>
                            <ul>
                                <li>
                                    <div>
                                        <div>Itens</div>
                                        <div>R$:{itemsPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <div>Taxa</div>
                                        <div>R$:{taxPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <div>Entrega</div>
                                        <div>R$:{shippingPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="mb-2 flex text-xl justify-between">
                                        <div>Total</div>
                                        <div className='flex flex-col align-middle items-end'>
                                            <span className='text-md text-red-500 line-through'>de: R$&nbsp;
                                                {totalPrice}</span>
                                            <span className='text-xl text-green-600'>por: R$&nbsp;
                                                {descount}</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
      )
      )}
    </Layout>
  )
}

OrderScreen.auth = true
export default OrderScreen
