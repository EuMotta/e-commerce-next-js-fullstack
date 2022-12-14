import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'
import CheckoutWizard from '../components/CheckoutWizard'
import Layout from '../components/Layout'
import { Store } from '../utils/Store'
import { useRouter } from 'next/router'

export default function ShippingScreen() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue
    } = useForm()

    const { state, dispatch } = useContext(Store)
    const { cart } = state
    const { shippingAddress } = cart
    const router = useRouter()

    useEffect(() => {
        setValue('name', shippingAddress.name)
        setValue('postalCode', shippingAddress.postalCode)
        setValue('number', shippingAddress.number)
        setValue('address', shippingAddress.address)
        setValue('neighborhood', shippingAddress.neighborhood)
        setValue('city', shippingAddress.city)
        setValue('state', shippingAddress.state)
    }, [setValue, shippingAddress])

    const submitHandler = ({ name, postalCode, number, address, neighborhood, city, state }) => {
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: { name, postalCode, number, address, neighborhood, city, state }
        })
        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                shippingAddress: {
                    name,
                    postalCode,
                    number,
                    address,
                    neighborhood,
                    city,
                    state,
                }
            })
        )
        router.push('/payment')
    }
    const checkCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, '')
        fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
            console.log(data)
            setValue('address', data.logradouro)
            setValue('neighborhood', data.bairro)
            setValue('city', data.localidade)
            setValue('state', data.uf)
        })
    }

    return (
        <Layout title="Endere??o da Entrega">
            <CheckoutWizard activeStep={1} />
            <div className='card w-full'>
                <form
                    className="mx-auto p-3 justify-center max-w-screen-md container"
                    onSubmit={handleSubmit(submitHandler)}
                >
                    <h1 className="mb-4 text-2xl text-center text-indigo-600">Formul??rio para Entrega do Produto</h1>
                    <div className='flex gap-10 justify-between'>
                        <div className="mb-4 grid col-span-1">
                            <label className='text-xl text-indigo-700' htmlFor="name">Nome completo</label>
                            <input
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"
                                id="name"
                                label="Nome completo"
                                autoFocus
                                {...register('name', {
                                    required: 'Por favor, digite seu nome completo',
                                    minLength: { value: 4, message: 'Por favor, digite tamb??m seu sobrenome' },
                                })}
                            />
                            {errors.name && (
                                <div className="text-red-500">{errors.name.message}</div>
                            )}
                        </div>
                        <div className="mb-4 grid col-span-1">
                            <label className='text-xl text-indigo-700' htmlFor="lastName">Sobrenome</label>
                            <input
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"
                                id="lastName"
                                label="Sobrenome"
                                autoFocus
                                {...register('lastName', {
                                    required: 'Por favor, digite seu nome completo',
                                    minLength: { value: 4, message: 'Por favor, digite tamb??m seu sobrenome' },
                                })}
                            />
                            {errors.lastName && (
                                <div className="text-red-500">{errors.lastName.message}</div>
                            )}
                        </div>
                    </div>
                    <div className='flex gap-10 justify-between'>
                        <div className="mb-4 grid col-span-1">
                            <label className='text-xl text-indigo-700' htmlFor="postalCode">CEP</label>
                            <input
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"
                                id="postalCode"
                                onBlurCapture={checkCEP}
                                {...register('postalCode', {
                                    required: 'Por favor, Digite o CEP de sua resid??ncia',
                                    minLength: { value: 8, message: 'O CEP dever?? conter no m??nimo 8 n??meros' },
                                    maxLength: { value: 10, message: 'O CEP dever?? conter apenas 8 n??meros' }
                                })}
                            />
                            {errors.postalCode && (
                                <div className="text-red-500 ">{errors.postalCode.message}</div>
                            )}
                        </div>
                        <div className="mb-4 grid col-span-1">
                            <label className='text-xl text-indigo-700' htmlFor="number">N??mero</label>
                            <input
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"
                                id="number"
                                {...register('number', {
                                    required: 'Por favor, digite o n??mero de seu endere??o',
                                    minLength: { value: 1, message: 'O n??mero informado dever?? ser maior que 1, caso n??o possua n??mero, digite 0' },
                                })}
                            />
                            {errors.number && (
                                <div className="text-red-500">{errors.number.message}</div>
                            )}
                        </div>
                    </div>
                    <div className='flex gap-10  justify-between'>
                        <div className="mb-4 grid col-span-1">
                            <label className='text-xl text-indigo-700' htmlFor="address">Rua</label>
                            <input
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"
                                id="address"
                                {...register('address', {
                                    required: 'Por favor, digite o nome de sua rua',
                                    minLength: {
                                        value: 10, message: 'O n??mero dever?? ser informado'
                                    },
                                })}
                            />
                            {errors.address && (
                                <div className="text-red-500">{errors.address.message}</div>
                            )}
                        </div>
                        <div className="mb-4 grid col-span-1">
                            <label className='text-xl text-indigo-700' htmlFor="neighborhood">Bairro</label>
                            <input
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"
                                id="neighborhood"
                                {...register('neighborhood', {
                                    required: 'Por favor, digite seu bairro',
                                })}
                            />
                            {errors.neighborhood && (
                                <div className="text-red-500 ">{errors.neighborhood.message}</div>
                            )}
                        </div>
                    </div>
                    <div className='flex gap-10 justify-between'>
                        <div className="mb-4 grid col-span-1">
                            <label className='text-xl text-indigo-700' htmlFor="city">Cidade</label>
                            <input
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"
                                id="city"
                                {...register('city', {
                                    required: 'Por favor, digite sua cidade',
                                })}
                            />
                            {errors.city && (
                                <div className="text-red-500 ">{errors.city.message}</div>
                            )}
                        </div>
                        <div className="mb-4 grid col-span-1">
                            <label className='text-xl text-indigo-700' htmlFor="state">UF do Estado</label>
                            <input
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"
                                id="state"
                                {...register('state', {
                                    required: 'Por favor, digite seu Estado',
                                    minLength: { value: 2, message: 'Digite a UF do Estado no formato v??lido. Ex.: SP' },
                                    maxLength: { value: 3, message: 'Digite a UF do Estado no formato v??lido. Ex.: SP' },
                                })}
                            />
                            {errors.state && (
                                <div className="text-red-500 ">{errors.state.message}</div>
                            )}
                        </div>
                    </div>
                    <div className="mb-4 text-end">
                        <button className="primary-button">Avan??ar</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

ShippingScreen.auth = true