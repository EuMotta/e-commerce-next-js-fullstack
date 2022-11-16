import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useReducer } from 'react'
import { toast } from 'react-toastify'
import Layout from '../../components/Layout'
import { getError } from '../../utils/error'
import { FcInfo,FcPaid } from 'react-icons/fc'

function reducer(state, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" }
        case "FETCH_SUCCESS":
            return { ...state, loading: false, products: action.payload, error: "" }
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload }
        case "CREATE_REQUEST":
            return { ...state, loadingCreate: true }
        case "CREATE_SUCCESS":
            return { ...state, loadingCreate: false }
        case "CREATE_FAIL":
            return { ...state, loadingCreate: false }
        case "DELETE_REQUEST":
            return { ...state, loadingDelete: true }
        case "DELETE_SUCCESS":
            return { ...state, loadingDelete: false, successDelete: true }
        case "DELETE_FAIL":
            return { ...state, loadingDelete: false }
        case "DELETE_RESET":
            return { ...state, loadingDelete: false, successDelete: false }
        default:
            state
    }
}
export default function ProductsScreen() {
    const router = useRouter()
    const [
        { loading, error, products, loadingCreate, successDelete, loadingDelete },
        dispatch,
    ] = useReducer(reducer, {
        loading: true,
        products: [],
        error: "",
    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" })
                const { data } = await axios.get(`/api/admin/products`)
                dispatch({ type: "FETCH_SUCCESS", payload: data })
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: getError(err) })
            }
        }
        if (successDelete) {
            dispatch({ type: "DELETE_RESET" })
        } else {
            fetchData()
        }
    }, [successDelete])
    // const deleteHandler = async (productId) => {
    //     if (!window.confirm("Você tem certeza?")) {
    //         return
    //     }
    //     try {
    //         dispatch({ type: "DELETE_REQUEST" })
    //         await axios.delete(`/api/admin/products/${productId}`)
    //         dispatch({ type: "DELETE_SUCCESS" })
    //         toast.success("Produto deletado com sucesso!")
    //     } catch (err) {
    //         dispatch({ type: "DELETE_FAIL" })
    //         toast.error(getError(err))
    //     }
    // }
    const createHandler = async () => {
        if (!window.confirm("Você tem certeza?")) {
            return
        }
        try {
            dispatch({ type: "CREATE_REQUEST" })
            const { data } = await axios.post(`/api/admin/products`)
            dispatch({ type: "CREATE_SUCCESS" })
            toast.success("Produto criado com sucesso!")
            router.push(`/admin/product/${data.product._id}`)
        } catch (err) {
            dispatch({ type: "CREATE_FAIL" })
            toast.error(getError(err))
        }
    }
    return (
        <Layout title='Produtos'>
            <div className="grid md:grid-cols-6 md:gap-5">
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
                <div className=" mx-2 md:col-span-6">
                    <div className='grid'>
                        <h1 className="mb-4 flex justify-center text-indigo-600 text-4xl">
                            <FcPaid/>Produtos Cadastrados
                        </h1>
                        {loadingDelete && <div>Deletando item...</div>}
                        <button className='primary-button'
                            disabled={loadingCreate}
                            onClick={createHandler}>
                            {loadingCreate ? 'Carregando' : 'Adicionar Produtos'}
                        </button>
                    </div>
                    {loading ? (
                        <div>Carregando...</div>
                    ) : error ? (
                        <div className="alert-error">{error}</div>
                    ) : (
                        <div className="flex mb-5 justify-center">
                            <table className="w-full mx-2">
                                <thead className="border-b-8  border-2 border-b-indigo-500">
                                    <tr className="text-sm text-slate-800">
                                        <th className="px-5 text-center">ID</th>
                                        <th className="p-5 text-center">Produto</th>
                                        <th className="p-5 text-center">Categoria</th>

                                        <th className="p-5 text-center">Avaliação</th>
                                        <th className="p-5 text-center">Vendidos</th>
                                        <th className="p-5 text-center">Quantidade</th>
                                        <th className="p-5 text-center">Preço</th>
                                        <th className="p-5 text-center">Desconto</th>
                                        <th className="p-5 text-center">Detalhes</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center" >
                                    {products.map((product) => (
                                        <tr
                                            key={product._id}
                                            className=" rounded text-md shadow-sm shadow-slate-500 hover:translate-x-1 ease-in-out transition-all  hover:shadow-md hover:shadow-slate-700"
                                        >
                                            <td className="p-5">{product._id.substring(20, 24)}</td>
                                            <td className="flex  cursor-pointer mt-2 items-center">
                                                <Image
                                                    src={product.image}
                                                    alt={product.name}
                                                    width={50}
                                                    height={50}
                                                    className='rounded-lg'
                                                ></Image>
                                                &nbsp;
                                                {product.name}
                                            </td>
                                            <td className="p-5">{product.category}</td>

                                            <td className="p-2">{product.rating}</td>
                                            <td className="p-2">{product.sellCount}</td>{/*Não consigo fazer o contamento de vendas ainda*/}
                                            <td className="p-5">{product.countInStock > 0 ?
                                                (<div className="text-sm text-center"><i className="ri-checkbox-blank-circle-fill mx-1 text-green-400"></i>Em estoque: {product.countInStock}</div>
                                                ) : (
                                                    <div className="text-sm text-center"><i className="ri-checkbox-blank-circle-fill mx-1 text-red-400"></i>Sem estoque</div>
                                                )}</td>
                                            <td className="p-5">{product.price}</td>
                                            <td className="p-5">{product.descount == 0 ? <span className='text-sm text-red-400'>Sem desconto</span> : `${product.descount} %`} </td>

                                            <td className="p-5 text-center">
                                                <div>
                                                    <span className=" flex justify-center">
                                                        <Link href={`/admin/product/${product._id}`}>
                                                            <FcInfo className='text-3xl cursor-pointer' />
                                                        </Link>
                                                    </span>
                                                    {' '}
                                                    {/* <button className="cursor-pointer  !bg-red-400"
                                                        onClick={() => deleteHandler(product._id)}
                                                        type='button'><i className="ri-delete-bin-2-line text-lg"></i></button> */}
                                                </div>
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
ProductsScreen.auth = { adminOnly: true }
