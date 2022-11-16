import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react';
import { useEffect, useReducer } from 'react'
import Layout from '../../components/Layout'
import { getError } from '../../utils/error'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { toast } from 'react-toastify'
import { BsPaypal } from 'react-icons/bs';
import { FaBarcode, FaStripe } from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, order: action.payload, error: '' }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'PAY_REQUEST':
            return { ...state, loadingPay: true }
        case 'PAY_SUCCESS':
            return { ...state, loadingPay: false, successPay: true }
        case 'PAY_FAIL':
            return { ...state, loadingPay: false, errorPay: action.payload }
        case 'PAY_RESET':
            return { ...state, loadingPay: false, successPay: false, errorPay: '' }
        case 'DELIVER_REQUEST':
            return { ...state, loadingDeliver: true };
        case 'DELIVER_SUCCESS':
            return { ...state, loadingDeliver: false, successDeliver: true };
        case 'DELIVER_FAIL':
            return { ...state, loadingDeliver: false };
        case 'DELIVER_RESET':
            return {
                ...state,
                loadingDeliver: false,
                successDeliver: false,
            };
        default:
            state
    }
}
function OrderScreen() {
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()
    const { query } = useRouter()
    const orderId = query.id
    const { data: session } = useSession()
    const [
        {
            loading,
            error,
            order,
            successPay,
            loadingPay,
            loadingDeliver,
            successDeliver,
        },
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
        if (!order._id || successPay || successDeliver || (order._id && order._id !== orderId)) {
            fetchOrder()
            if (successPay) {
                dispatch({ type: 'PAY_RESET' })
            }
            if (successDeliver) {
                dispatch({ type: 'DELIVER_RESET' });
            }
        } else {
            const loadPaypalScript = async () => {
                const { data: clientId } = await axios.get('/api/keys/paypal')
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': clientId,
                        currency: 'USD',
                    },
                })
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
            }
            loadPaypalScript()
        }
    }, [order, orderId, paypalDispatch, successDeliver, successPay]);
    function createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: { value: totalDescount },
                    },
                ],
            })
            .then((orderID) => {
                return orderID
            })
    }
    async function deliverOrderHandler() {
        try {
            dispatch({ type: 'DELIVER_REQUEST' });
            const { data } = await axios.put(
                `/api/admin/orders/${order._id}/deliver`,
                {}
            );
            dispatch({ type: 'DELIVER_SUCCESS', payload: data });
            toast.success('Order is delivered');
        } catch (err) {
            dispatch({ type: 'DELIVER_FAIL', payload: getError(err) });
            toast.error(getError(err));
        }
    }

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                dispatch({ type: 'PAY_REQUEST' })
                const { data } = await axios.put(
                    `/api/orders/${order._id}/pay`,
                    details
                )
                dispatch({ type: 'PAY_SUCCESS', payload: data })
                toast.success('Pagamento do pedido foi realizado com sucesso!')
            } catch (err) {
                dispatch({ type: 'PAY_FAIL', payload: getError(err) })
                toast.error(getError(err))
            }
        })
    }
    function onError(err) {
        toast.error(getError(err))
    }
    const {
        shippingAddress,
        paymentMethod,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid,
        paidAt,
        isDelivered,
        deliveredAt,
    } = order
    const totalDescount = (totalPrice * 0.95).toFixed(2)
    return (
        <Layout title={`Pedido ${orderId}`}>
            <h1 className="mb-4 text-center text-indigo-800 text-3xl">{`ID: ${orderId}`}</h1>
            {loading ? (
                <div>Carregando...</div>
            ) : error ? (
                <div className="alert-error">{error}</div>
            ) : (
                <div className="grid md:grid-cols-4 md:gap-5">
                    <div className="overflow-x-auto md:col-span-3">
                        <div className=" card  text-center mx-1 overflow-x-auto p-5">
                            <h2 className="mb-2 text-indigo-800 text-3xl">Lista dos Produtos</h2>
                            <table className="min-w-full">
                                <thead className="border-y border-indigo-800">
                                    <tr className='text-indigo-800 text-1xl'>
                                        <th className="px-5 text-center">Item</th>
                                        <th className="p-5 text-center">Quantidade</th>
                                        <th className="p-5 text-center">Preço</th>
                                        <th className="p-5 text-center">Preço Un.</th>
                                        
                                        <th className="p-5 text-center">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderItems.map((item) => (
                                        <tr key={item._id} className='border-y divide-blue-600 border-blue-600'>
                                            <td>
                                                <Link href={`/product/${item.slug}`}>
                                                    <div className="flex  cursor-pointer items-center">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            width={50}
                                                            height={50}
                                                        ></Image>
                                                        &nbsp;
                                                        {item.name}
                                                    </div>
                                                </Link>
                                            </td>
                                            <td className="p-5 only:text-center">{item.quantity}</td>
                                            <td className="p-5 text-center">R$ {item.price * item.quantity}</td>
                                            <td className="p-5 text-center">R$ {item.price}</td>
                                            <td className="p-5 text-center">
                                                R$ {item.quantity * item.price}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='flex  mx-12 justify-between gap-x-5'>
                            <div className="card rounded-xl bg-white w-1/2 p-5">
                                <h2 className="mb-2 text-indigo-600 text-center text-3xl">Endereço para entrega</h2>
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
                                <div className='flex items-center flex-col'>
                                    {isDelivered ? (
                                        
                                        <div className="alert-success">Entregue {deliveredAt}</div>
                                    ) : (
                                        <div className="alert-error">Não entregue</div>
                                    )}
                                </div>
                            </div>
                            <div className="card rounded-xl bg-white mx-1 w-1/2 p-5">
                                <div className='flex flex-col justify-between h-full'>
                                    <h2 className="mb-2 text-indigo-800 text-center text-3xl">Método de pagamento</h2>
                                    <div className='mb-2 text-xl text-center'>{
                                            paymentMethod === 'Paypal' ?
                                                (<div className='flex  justify-center '><BsPaypal /> {paymentMethod} </div>)
                                                : paymentMethod === 'Stripe' ?
                                                   (<div className='flex   justify-center'><FaStripe />{paymentMethod} </div>)
                                                    : paymentMethod === 'PIX' ?
                                                        (<div className='flex   justify-center'><GiReceiveMoney /> {paymentMethod}</div>)
                                                        : paymentMethod === 'Boleto' ?
                                                           (<div className='flex  justify-center '><FaBarcode />{paymentMethod} </div>)
                                                            : ''

                                        }</div>
                                    <div className='flex items-center flex-col'>
                                        {isPaid ? (
                                            
                                            <div className="alert-success">Pago às {paidAt.substring(11, 19)} do dia {paidAt.substring(8, 10)}/{paidAt.substring(5, 7)}/{paidAt.substring(0, 4)}. </div>
                                        ) : (
                                            <div className="alert-error bg-red-600"><i className="ri-checkbox-blank-circle-fill mx-1 text-white"></i>Ainda não confirmado</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-blue-100 shadow-md rounded-lg p-5 border border-green-700">
                            <h2 className="mb-2 text-indigo-800 text-center text-3xl">Resumo do Pedido</h2>
                            <ul>
                                <li>
                                    <div className="mb-2 gap-5 text-xl flex justify-between">
                                        <div>Itens</div>
                                        <div>R$&nbsp;{itemsPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="mb-2 flex text-xl justify-between">
                                        <div>Taxa</div>
                                        <div>R$&nbsp;{taxPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="mb-2 flex text-xl justify-between">
                                        <div>Entrega</div>
                                        <div>R$&nbsp;{shippingPrice}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="mb-2 flex text-xl justify-between">
                                        <div>NfDesconto</div>
                                        <div>5%</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="mb-2 flex text-xl justify-between">
                                        <div className='mt-3cpmst'>Total</div>
                                        <div className='flex flex-col align-middle items-end'>
                                            <span className='text-md text-red-500 line-through'>de: R$&nbsp;
                                                {totalPrice}</span>
                                            <span className='text-xl text-green-600'>por: R$&nbsp;
                                                {totalDescount}</span>
                                        </div>
                                    </div>
                                </li>
                                {!isPaid && (
                                    <li>
                                        {isPending ? (
                                            <div>Carregando...</div>
                                        ) : (
                                            <div className="w-full">
                                                <PayPalButtons
                                                    createOrder={createOrder}
                                                    onApprove={onApprove}
                                                    onError={onError}
                                                    Layout='responsive'
                                                ></PayPalButtons>
                                            </div>
                                        )}
                                        {loadingPay && <div>Carregando...</div>}
                                    </li>
                                )}
                                {session.user.isAdmin && order.isPaid && !order.isDelivered && (
                                    <li>
                                        {loadingDeliver && <div>Carregando...</div>}
                                        <button
                                            className="primary-button bg-white w-full"
                                            onClick={deliverOrderHandler}
                                        >
                                            Confirmar entrega
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    
                </div>
                
            )}
        </Layout>
    );
}

OrderScreen.auth = true;
export default OrderScreen;