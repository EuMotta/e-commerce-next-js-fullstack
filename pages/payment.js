import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import CheckoutWizard from '../components/CheckoutWizard'
import Layout from '../components/Layout'
import { Store } from '../utils/Store'
import { BsPaypal, } from 'react-icons/bs'
import { GiReceiveMoney } from 'react-icons/gi'
import { FaBarcode, FaStripe } from 'react-icons/fa'

const method = [
    'Paypal',
    'PIX',
    'Stripe',
    'Boleto'
]

export default function PaymentScreen() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
    const { state, dispatch } = useContext(Store)
    const { cart } = state
    const { shippingAddress, paymentMethod } = cart
    const router = useRouter()
    const submitHandler = (e) => {
        e.preventDefault()
        if (!selectedPaymentMethod) {
            return toast.error('Por favor, selecione o método de pagamento!')
        }
        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod })
        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                paymentMethod: selectedPaymentMethod,
            })
        )
        router.push('/placeorder')
    }
    useEffect(() => {
        if (!shippingAddress.address) {
            return router.push('/shipping')
        }
        setSelectedPaymentMethod(paymentMethod || '')
    }, [paymentMethod, router, shippingAddress.address])

    return (
        <Layout title="Pagamento">
            <CheckoutWizard activeStep={2} />
            <div className='card w-full'>
                <form className="mx-auto max-w-screen-md " onSubmit={submitHandler}>
                    <h1 className="mb-4 text-center text-indigo-600 text-2xl">Método de Pagamento</h1>
                    {
                        method.map((payment, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <label className="focus:bg-blue-600 text-center cursor-pointer w-1/3 text-xl px-10 py-2 card bg-white hover:text-white  hover:shadow-slate-500 hover:bg-indigo-500 hover:border-blue-600 hover:outline-none" htmlFor={payment}>
                                    <span className='flex justify-between'>
                                        <input
                                            name="paymentMethod"
                                            className="p-2 cursor-pointer m-2 outline-non focus:ring-0"
                                            id={payment}
                                            type="radio"
                                            checked={selectedPaymentMethod === payment}
                                            onChange={() => setSelectedPaymentMethod(payment)}
                                        />

                                        {
                                            payment === 'Paypal' ?
                                                (<div className='flex gap-x-10 justify-between'>{payment}<BsPaypal /> </div>)
                                                : payment === 'Stripe' ?
                                                    (<div className='flex gap-x-10 justify-between'>{payment} <FaStripe /></div>)
                                                    : payment === 'PIX' ?
                                                        (<div className='flex gap-x-14 justify-between'> {payment}<GiReceiveMoney /></div>)
                                                        : payment === 'Boleto' ?
                                                            (<div className='flex gap-x-10 justify-between'>{payment} <FaBarcode /></div>)
                                                            : ''

                                        }
                                    </span>
                                </label>
                            </div>
                        ))
                    }
                    <div className="mb-4 flex justify-between">
                        <button
                            onClick={() => router.push('/shipping')}
                            type="button"
                            className=" bg-red-400 rounded py-0 pt-1 px-5 shadow-sm shadow-slate-700 m-2"
                        >
                            Voltar
                        </button>
                        <button className="primary-button">Avançar</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

PaymentScreen.auth = true