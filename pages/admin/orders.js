import axios from "axios";
import { getError } from "../../utils/error";
import Layout from "../../components/Layout";
import Link from "next/link";
import moment from "moment";
import React, { useEffect, useReducer } from "react";
import "remixicon/fonts/remixicon.css";

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" };
        case "FETCH_SUCCESS":
            return { ...state, loading: false, orders: action.payload, error: "" };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            state;
    }
}

export default function AdminOrderScreen() {
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        orders: [],
        error: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" });
                const { data } = await axios.get(`/api/admin/orders`);
                dispatch({ type: "FETCH_SUCCESS", payload: data });
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: getError(err) });
            }
        };
        fetchData();
    }, []);
    return (
        <Layout title="Pedidos">
            <div className="grid ml-14 md:grid-cols-6 md:gap-5">
                {/* <div className="card md:col-span-1  text-center text-md py-5 px-1">
                <i className="ri-admin-fill text-4xl text-indigo-700"></i>
                    <ul className=" mr-3">
                        <li>
                            <Link href="/admin/dashBoard">
                                <button className="cursor-pointer  w-full primary-button">
                                    Visão geral
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/orders">
                                <button className="cursor-pointer w-full primary-button">
                                    Pedidos
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/products">
                                <button className="cursor-pointer  w-full primary-button">
                                    Produtos
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/users">
                                <button className="cursor-pointer w-full primary-button">
                                    Usuários
                                </button>
                            </Link>
                        </li>
                    </ul>
                </div> */}
                <div className="overflow-x-auto md:col-span-6">
                    <h1 className="mb-4 text-center card text-blue-700 text-4xl">
                        Pedidos
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
                                        <th className="p-5 text-center">Total R$</th>
                                        <th className="p-5 text-center">Status do pagamento</th>
                                        <th className="p-5 text-center">Data da entrega</th>
                                        <th className="p-5 text-center">Detalhes</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {orders.map((order) => (
                                        <tr
                                            key={order._id}
                                            className=" rounded text-md shadow-sm shadow-slate-500 hover:translate-x-1 ease-in-out transition-all  hover:shadow-md hover:shadow-slate-700"
                                        >
                                            <td className="p-5">{order._id.substring(20, 24)}</td>
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
                                            <td className="p-5">{order.totalPrice}</td>
                                            <td className="p-5">
                                                {order.isPaid ? (
                                                    <span className="bg-green-200 p-2 text-sm rounded-xl">
                                                        {order.paidAt.substring(11, 19)}
                                                    </span>
                                                ) : (
                                                    <span className="bg-red-400 cursor-pointer p-1 px-2 text-sm rounded">
                                                        Não Pago
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
                                                        <span className="bg-red-400 flex cursor-pointer p-1 px-2 text-sm rounded">
                                                            Não Entregue
                                                        </span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-5 text-center">
                                                <Link href={`/order/${order._id}`} passHref>
                                                    <span className="cursor-pointer ">
                                                       <i className='ri-file-list-3-line text-2xl '></i>
                                                    </span>
                                                </Link>
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
    );
}

AdminOrderScreen.auth = { adminOnly: true };