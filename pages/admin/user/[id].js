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
        case "DELETE_REQUEST":
            return { ...state, loadingDelete: true }
        case "DELETE_SUCCESS":
            return { ...state, loadingDelete: false, successDelete: true }
        case "DELETE_FAIL":
            return { ...state, loadingDelete: false }
        case "DELETE_RESET":
            return { ...state, loadingDelete: false, successDelete: false }
        default:
            return state
    }
}
export default function AdminUserEditScreen() {
    const { query } = useRouter()
    const router = useRouter()
    const userId = query.id
    const [{ loading, error, loadingUpdate, successDelete, loadingDelete }, dispatch] = useReducer(reducer, {
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
                setValue('password', data.password)
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
            }
        }
        if (successDelete) {
            dispatch({ type: "DELETE_RESET" })
          } else {
            fetchData()
          }
        fetchData()
    }, [userId, setValue,successDelete])

    const submitHandler = async ({
        name,
        lastName,
        image,
        email,
        isAdmin,
        password,
    }) => {
        try {
            dispatch({ type: 'UPDATE_REQUEST' })
            await axios.put(`/api/admin/users/${userId}`, {
                name,
                lastName,
                image,
                email,
                isAdmin,
                password,
                userId,
            })
            dispatch({ type: 'UPDATE_SUCCESS' })
            toast.success('Usu??rio atualizado.')
            router.push('/admin/users')
        } catch (err) {
            dispatch({ type: 'UPDATE_FAIL', payload: getError(err) })
            toast.error(getError(err))
        }
    }
    const deleteHandler = async (userId) => {
        if (!window.confirm("Voc?? tem certeza?")) {
            return
        }
        try {
            dispatch({ type: "DELETE_REQUEST" })
            await axios.delete(`/api/admin/users/${userId}`)
            dispatch({ type: "DELETE_SUCCESS" })
            toast.success("Usuario deletado.")
        } catch (err) {
            dispatch({ type: "DELETE_FAIL" })
            toast.error(getError(err))
        }
        router.push('/admin/users')
    }
    return (
        <Layout title={`Editar usu??rio ${userId}`}>
            <div className="grid md:grid-cols-6 md:gap-5">
                <div className="md:col-span-6">
                    <h1 className="mb-4 text-center py-2 card text-indigo-700 text-2xl">{`Editar Usu??rio: ${userId}`}</h1>
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
                                                message: "Por favor, digite um nome v??lido",
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
                                            required: 'Por favor, digite seu ??ltimo nome',
                                            minLength: {
                                                value: 3,
                                                message: 'Por favor, digite um sobrenome v??lido'
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
                                            message: 'Por favor, insira um email v??lido.',
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <div className="text-red-500">{errors.email.message}</div>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <div className="mb-4">
                                    <label htmlFor="image" className="text-xl">
                                        Imagem
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control  focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600  block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:outline-none"
                                        id="image"
                                        {...register("image", {
                                            required:
                                                "Por favor, digite o diret??rio da imagem e seu tipo.",
                                        })}
                                    />
                                    {errors.image && (
                                        <div className="text-red-600">{errors.image.message}</div>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="isAdmin" className="text-xl text-indigo-700">
                                        Admin
                                    </label>
                                    <select
                                        className="form-control  focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600  block  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:outline-none"
                                        id="isAdmin"
                                        type='boolean'
                                        {...register("isAdmin")}
                                    >
                                        <option id="isAdmin" value={false}>N??o</option>
                                        <option id="isAdmin" value={true}>Sim</option>
                                    </select>
                                    {errors.category && (
                                        <div className="text-red-600">
                                            {errors.category.message}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-6 ">
                                    <label
                                        className='hidden'
                                        htmlFor='password'
                                    >Senha</label>
                                    <input
                                        type="password"
                                        id="password"
                                        {...register('password')}
                                        className="form-control hidden cursor-not-allowed select-none  focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600  w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:outline-none"
                                    />{errors.password && (<div className='text-sm text-red-500'>{errors.password.message}</div>)}
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
                                    type="button"
                                    className="cursor-pointer  !bg-red-400"
                                    onClick={() => deleteHandler(userId)}
                                >
                                    <i className="ri-delete-bin-2-line text-lg"></i>
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