
import axios from 'axios'
import moment from 'moment'
import Link from 'next/link'
import React, { useEffect, useReducer } from 'react'
import Layout from '../components/Layout'
import { getError } from '../utils/error'
import 'remixicon/fonts/remixicon.css'

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, orders: action.payload, error: '' }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

function OrderHistoryScreen() {
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        orders: [],
        error: '',
    })
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' })
                const { data } = await axios.get(`/api/orders/history`)
                dispatch({ type: 'FETCH_SUCCESS', payload: data })
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
            }
        }
        fetchOrders()
    }, [])
    return (
        <Layout title="Histórico" >
            <h1 className="mb-4 text-center text-blue-800 text-4xl bg-white">Histórico de Compras</h1>
            {
                loading ? (
                    <div>Carregando...</div>
                ) : error ? (
                    <div className="alert-error">{error}</div>
                ) : (
                    <div className="flex mb-5 justify-center">
                        <table className="">
                            <thead className="border-b-8  border-2 border-b-indigo-500">
                                <tr className='text-md text-slate-800'>
                                    <th className="px-5 border text-center">Id</th>
                                    <th className="p-3 border text-center">Data do pedido</th>
                                    <th className="p-3 border text-center">Total</th>
                                    <th className="p-3 border text-center">Pagamento</th>
                                    <th className="p-3 border text-center">Data da entrega</th>
                                    <th className="p-3 border text-center">Detalhes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id} className=" rounded text-md shadow-sm shadow-slate-500 hover:translate-x-1 ease-in-out transition-all  hover:shadow-md hover:shadow-slate-700">
                                        <td className="px-3 py-2  text-center">{order._id.substring(18, 24)}</td>
                                        <td className="px-3 py-2 border text-center">{order.createdAt.substring(0, 10)}</td>
                                        <td className="px-3 py-2 border text-center">R$ {order.descount}</td>
                                        <td className="px-3 py-2  text-center">
                                            {
                                                order.isPaid
                                                    ? <span className='bg-green-200 cursor-default p-1 px-5 text-sm rounded'>{order.paidAt.substring(0, 10)}</span>
                                                    : <Link href={`/order/${order._id}`} passHref><span className='bg-red-400 flex cursor-pointer p-1 px-2 text-sm rounded'><i className="ri-checkbox-blank-circle-fill mx-1 text-white"></i>Pendente</span></Link>
                                            }
                                        </td>
                                        <td className="px-3 py-2 border text-center">
                                            {
                                                order.isDelivered
                                                    ? <span className='bg-green-200 cursor-default p-1 text-sm rounded'><i className="ri-checkbox-blank-circle-fill mx-1 text-white"></i>{order.deliveredAt.substring(0, 10)}</span>
                                                    : <div className='flex flex-col items-center'>
                                                        <span className='text-xs relative'>Previsão: {moment().add(7, 'day').calendar().substring(0, 5)}</span>
                                                        <span className='bg-red-400 cursor-default p-1 text-sm rounded flex '><i className="ri-checkbox-blank-circle-fill mx-1 text-white"></i>Não Entregue</span>
                                                    </div>
                                            }
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            <Link href={`/order/${order._id}`} passHref>
                                                <span className=' cursor-pointer '>
                                                    <i className='ri-file-list-3-line text-2xl '></i>
                                                </span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                )
            }
        </Layout >
    )
}

OrderHistoryScreen.auth = true
export default OrderHistoryScreen