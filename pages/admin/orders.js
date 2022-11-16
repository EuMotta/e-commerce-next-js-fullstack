import axios from "axios"
import { getError } from "../../utils/error"
import Layout from "../../components/Layout"
import Link from "next/link"
import moment from "moment"
import React, { useEffect, useReducer } from "react"
import "remixicon/fonts/remixicon.css"
import { FcViewDetails, FcTodoList, FcInspection } from 'react-icons/fc'

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" }
        case "FETCH_SUCCESS":
            return { ...state, loading: false, orders: action.payload, error: "" }
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload }
        case 'FETCH_REQUEST_ID':
            return { ...state, loading: true, error: '' }
        case 'FETCH_SUCCESS_ID':
            return { ...state, loading: false, order: action.payload, error: '' }
        case 'FETCH_FAIL_ID':
            return { ...state, loading: false, error: action.payload }
        default:
            state
    }
}

export default function AdminOrderScreen() {
    // const { query } = useRouter()
    // const orderId = query.id
    const [{ loading, error, orders, }, dispatch] = useReducer(reducer, {
        loading: true,
        orders: [],
        error: "",
    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" })
                const { data } = await axios.get(`/api/admin/orders`)
                dispatch({ type: "FETCH_SUCCESS", payload: data })
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: getError(err) })
            }
        }
        fetchData()
    }, [])



    return (
        <Layout title="Pedidos">
            <div className="grid md:grid-cols-6 md:gap-5">
                <div className="overflow-x-auto md:col-span-6">
                    <h1 className="mb-4 flex justify-center text-indigo-600   text-4xl">
                        <FcTodoList className="" />&nbsp;Pedidos
                    </h1>
                    {loading ? (
                        <div>Carregando..</div>
                    ) : error ? (
                        <div className="alert-error">{error}</div>
                    ) : (
                        <div className="flex mb-5 justify-center">
                            <table className="w-full mx-2">
                                <thead className="border-b-8  border-2 border-b-indigo-500">
                                    <tr className="text-sm text-slate-800">
                                        <th className="px-5 text-center">ID</th>
                                        <th className="p-5 text-center">Nome do usuário</th>
                                        <th className="p-5 text-center">Data da compra</th>
                                        <th className="p-5 text-center">Total</th>
                                        <th className="p-5 text-center">Forma de pagamento</th>
                                        <th className="p-5 text-center">Status do pagamento</th>
                                        <th className="p-5 text-center">Data da entrega</th>
                                        <th className="p-5 text-center">Detalhes</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {orders.map((order) => (
                                        <tr
                                            title="Exibir ID completo"
                                            key={order._id}
                                            className=" rounded cursor-pointer text-md shadow-sm shadow-slate-500 hover:translate-x-1 ease-in-out transition-all  hover:shadow-md hover:shadow-slate-700"
                                        >
                                            <td className="p-5" title={order._id}>{order._id.substring(20, 24)}</td>
                                            <td className="p-5">
                                                {order.user ? order.user.name :
                                                    <span className="text-red-600">
                                                        Usuário deletado
                                                    </span>
                                                }
                                            </td>
                                            <td className="p-5">
                                                {order.createdAt.substring(8, 10)}/
                                                {order.createdAt.substring(5, 7)}/
                                                {order.createdAt.substring(0, 4)}
                                            </td>
                                            <td className="p-5">${order.totalPrice}</td>
                                            <td className="p-5">{order.paymentMethod}</td>
                                            <td className="p-5">
                                                {order.isPaid ? (
                                                    <span className=" p-2 text-sm rounded-xl flex justify-center items-center">
                                                        <FcInspection className="text-2xl" />{order.paidAt.substring(11, 19)}
                                                    </span>
                                                ) : (
                                                    <span className=" cursor-pointer p-1 px-2 text-sm rounded">
                                                        <i className="ri-checkbox-blank-circle-fill mx-1 text-red-400"></i> Não Pago
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-2">
                                                {order.isDelivered ? (
                                                    <span className="bg-green-200 p-2 rounded-xl">
                                                        {order.deliveredAt.substring(8, 10)}/
                                                        {order.deliveredAt.substring(5, 7)}/
                                                        {order.deliveredAt.substring(0, 4)}
                                                    </span>
                                                ) : (
                                                    <div className="flex flex-col items-center">
                                                        <span className="text-sm">
                                                            Previsão:{" "}
                                                            {moment()
                                                                .add(8, "days")
                                                                .fromNow()
                                                                .substring(3, 10)}
                                                        </span>
                                                        <span className="text-red-400 flex cursor-pointer p-1 px-2 text-sm rounded">
                                                            <i className="ri-checkbox-blank-circle-fill mx-1 text-red-400"></i> Não Entregue
                                                        </span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-5 text-center">
                                                <span className=" flex justify-center">
                                                    <Link href={`/order/${order._id}`} passHref>
                                                        <FcViewDetails className="cursor-pointer text-3xl" />
                                                    </Link>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

AdminOrderScreen.auth = { adminOnly: true }