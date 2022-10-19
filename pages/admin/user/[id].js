import React, { useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { getError } from '../../../utils/error'
import { toast } from 'react-toastify'
import Layout from '../../../components/Layout'
import axios from 'axios'


function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, error: '' }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}
export default function AdminUserEditScreen() {
    const { query } = useRouter()
    const router = useRouter()
    const userId = query.id
    const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm()

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: 'FETCH_REQUEST' })
                const { data } = await axios.get(`/api/admin/users/${userId}`)
                dispatch({ type: 'FETCH_SUCCESS' })
                setValue('name', data.name)
                setValue('lastName', data.lastName)
                setValue('image', data.image)
                setValue('email', data.email)
                setValue('isAdmin', data.isAdmin)
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
            }
        }

        fetchData()
    }, [userId, setValue])

    const submitHandler = async ({
        name,
        lastName,
        image,
        email,
        isAdmin,
    }) => {
        try {
            dispatch({ type: 'UPDATE_REQUEST' })
            await axios.put(`/api/admin/users/${userId}`, {
                name,
                lastName,
                image,
                email,
                isAdmin,
            })
            dispatch({ type: 'UPDATE_SUCCESS' })
            toast.success('Usuário atualizado.')
            router.push('/admin/users')
        } catch (err) {
            dispatch({ type: 'UPDATE_FAIL', payload: getError(err) })
            toast.error(getError(err))
        }
    }

    return (
        <Layout title={`Editar usuário ${userId}`}>
            <div className="grid md:grid-cols-6 md:gap-5">
                <div className="md:col-span-6">
                    <h1 className="mb-4 text-center py-2 card text-indigo-700 text-2xl">{`Editar Produto: ${userId}`}</h1>
                    {loading ? (
                        <div>Carregando...</div>
                    ) : error ? (
                        <div className="alert-error">{error}</div>
                    ) : (
                        <form
                            className="mx-auto text-xl p-10 w-full card "
                            onSubmit={handleSubmit(submitHandler)}
                        >
                            <div className='flex gap-3'>
                                <div className="mb-4">
                                    <label htmlFor="name" className="text-xl text-indigo-700">
                                        Nome
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control  focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600  block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:outline-none"
                                        id="name"
                                        autoFocus
                                        {...register("name", {
                                            required: "Por favor, digite o nome do produto",
                                            minLength: {
                                                value: 3,
                                                message: "Por favor, digite um nome válido",
                                            },
                                        })}
                                    />
                                    {errors.name && (
                                        <div className="text-red-600">{errors.name.message}</div>
                                    )}
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="lastName"
                                        className='text-md'>Sobrenome</label>
                                    <input
                                        {...register('lastName', {
                                            required: 'Por favor, digite seu último nome',
                                            minLength: {
                                                value: 3,
                                                message: 'Por favor, digite um sobrenome válido'
                                            }
                                        })}
                                        type="lastName"
                                        className='form-control  focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600  block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:outline-none'
                                        id="lastName"
                                    /> {errors.lastName && (<div className='text-sm text-red-500'>{errors.lastName.message}</div>)}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className='text-md'>E-mail</label>
                                <input
                                    type="email"
                                    className="form-control  focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600  block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:outline-none"
                                    id="email"
                                    {...register('email', {
                                        required: 'Por favor insira um email.',
                                        pattern: {
                                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                            message: 'Por favor, insira um email válido.',
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <div className="text-red-500">{errors.email.message}</div>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <div className="mb-4">
                                    <label htmlFor="image" className="text-xl text-indigo-700">
                                        Imagem
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control  focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600  block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:outline-none"
                                        id="image"
                                        {...register("image", {
                                            required:
                                                "Por favor, digite o diretório da imagem e seu tipo.",
                                        })}
                                    />
                                    {errors.image && (
                                        <div className="text-red-600">{errors.image.message}</div>
                                    )}
                                </div>
                            </div>
                            <div className='w-3/4 p-5 md:col-span-1 sm:col-span-2 col-span-2'>

                            </div>
                            <div className="mb-4 flex justify-between">
                                <button
                                    onClick={() => `/admin/users`}
                                    className="primary-button bg-white border border-solid border-gray-300"
                                >
                                    Voltar
                                </button>
                                <button
                                    disabled={loadingUpdate}
                                    className="primary-button bg-white border border-solid border-gray-300"
                                >
                                    {loadingUpdate ? "Carregando" : "Atualizar"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Layout>
    )
}

AdminUserEditScreen.auth = { adminOnly: true }