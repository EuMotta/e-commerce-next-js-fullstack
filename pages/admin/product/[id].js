import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useReducer, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Layout from '../../../components/Layout'
import { getError } from '../../../utils/error'
import noImage from '../../../public/img/404.svg'

function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true, error: '' }
        case 'FETCH_SUCCESS':
            return { ...state, loading: false, error: '' }
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true, errorUpdate: '' }
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false, errorUpdate: '' }
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false, errorUpdate: action.payload }
        case 'UPLOAD_REQUEST':
            return { ...state, loadingUpload: true, errorUpload: '' }
        case 'UPLOAD_SUCCESS':
            return {
                ...state,
                loadingUpload: false,
                errorUpload: '',
            }
        case 'UPLOAD_FAIL':
            return { ...state, loadingUpload: false, errorUpload: action.payload }
        default:
            return state
    }
}
export default function AdminProductEditScreen() {
    const { query } = useRouter()
    const productId = query.id
    const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    })
    const [imageSrc, setImageSrc] = useState();

    const uploadHandler = async (e, imageField = 'image') => {
        const url = `https://api.cloudinary.com/v1_1/dqezidbmw/upload`
        try {
            dispatch({ type: 'UPLOAD_REQUEST' })
            const {
                data: { signature, timestamp },
            } = await axios('/api/admin/cloudinarySign')
            const file = e.target.files[0]
            const formData = new FormData()
            formData.append('file', file)
            formData.append('signature', signature)
            formData.append('timestamp', timestamp)
            formData.append('api_key', 179111452499136)
            const { data } = await axios.post(url, formData)
            dispatch({ type: 'UPLOAD_SUCCESS' })
            setValue(imageField, data.secure_url)
            setImageSrc(data.secure_url);
            toast.success('Arquivo carregado com sucesso!')
        } catch (err) {
            dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) })
            toast.error(getError(err));
        }
    }

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
                const { data } = await axios.get(`/api/admin/products/${productId}`)
                dispatch({ type: 'FETCH_SUCCESS' })
                setValue('name', data.name)
                setValue('image', data.image)
                setValue('slug', data.slug)
                setValue('title', data.title)
                setValue('gender', data.gender)
                setValue('category', data.category)
                setValue('price', data.price)
                setValue('description', data.description)
                setValue('countInStock', data.countInStock)
                setValue('publisher', data.publisher)
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) })
            }
        }

        fetchData()
    }, [productId, setValue])

    const router = useRouter()

    const submitHandler = async ({
        name,
        image,
        slug,
        title,
        gender,
        category,
        price,
        description,
        countInStock,
        publisher,
    }) => {
        try {
            dispatch({ type: 'UPDATE_REQUEST' });
            await axios.put(`/api/admin/products/${productId}`, {
                name,
                image,
                slug,
                title,
                gender,
                category,
                price,
                description,
                countInStock,
                publisher,
            });
            dispatch({ type: 'UPDATE_SUCCESS' });
            toast.success('Product updated successfully');
            router.push('/admin/products');
        } catch (err) {
            dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
            toast.error(getError(err));
        }
    };

    return (
        <Layout title={`Edit Product ${productId}`}>
            <div className="grid md:grid-cols-6 md:gap-5">
                <div className="md:col-span-6">
                    <h1 className="mb-4 text-center py-2 card text-indigo-700 text-2xl">{`Editar Produto: ${productId}`}</h1>
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
                                <div className="mb-4">
                                    <label htmlFor="gender" className="text-xl text-indigo-700">
                                        Gênero
                                    </label>
                                    <select
                                        className="form-control  focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600  block  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:outline-none"
                                        id="gender"
                                        {...register("gender", {
                                            required: "Por favor, escolha uma categoria",
                                        })}
                                    >
                                        <option id="gender">NFT</option>
                                        <option id="gender"> </option>
                                    </select>
                                    {errors.gender && (
                                        <div className="text-red-600">{errors.gender.message}</div>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="title" className="text-xl text-indigo-700">
                                        Título
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control  focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600  block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:outline-none"
                                        id="title"
                                        autoFocus
                                        {...register("title", {
                                            required: "Por favor, digite o nome do produto",
                                            minLength: {
                                                value: 3,
                                                message: "Por favor, digite um nome válido",
                                            },
                                        })}
                                    />
                                    {errors.title && (
                                        <div className="text-red-600">{errors.title.message}</div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="slug" className="text-xl text-indigo-700">
                                    Slug
                                </label>
                                <input
                                    type="text"
                                    className="form-control  focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600  block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:outline-none"
                                    id="slug"
                                    {...register("slug", {
                                        pattern: {
                                            value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                                            message: "É permitido apenas letras, números e dashes.",
                                        },
                                        required:
                                            "Os slugs representam o ID nominal. Por favor, escreva-os sem espaços e sem letras maiúsculas!",
                                    })}
                                />
                                {errors.slug && (
                                    <div className="text-red-600">{errors.slug.message}</div>
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
                                <div className='card'>

                                    <Image
                                        src={imageSrc === " " ? noImage : imageSrc}
                                        alt="imagem"
                                        width={300}
                                        height={300}
                                        unoptimized
                                    >
                                    </Image>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="imageFile"
                                        className='text-2xl text-blue-700'>Carregar imagem</label>
                                    <input
                                        type="file"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:bg-blue-800 focus:border-blue-600 focus:outline-none"
                                        id="imageFile"
                                        onChange={uploadHandler}
                                    />
                                    {loadingUpload && <div>Enviando....</div>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="price" className="text-xl text-indigo-700">
                                        Preço
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control  focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600  block  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:outline-none"
                                        id="price"
                                        {...register("price", {
                                            required: "Por favor, digite um valor válido",
                                        })}
                                    />
                                    {errors.price && (
                                        <div className="text-red-600">{errors.price.message}</div>
                                    )}
                                </div>

                            </div>
                            <div className="flex gap-3">
                                <div className="mb-4">
                                    <label htmlFor="category" className="text-xl text-indigo-700">
                                        Tipo
                                    </label>
                                    <select
                                        className="form-control  focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600  block  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:outline-none"
                                        id="category"
                                        {...register("category", {
                                            required: "Por favor, escolha uma categoria",
                                        })}
                                    >
                                        <option id="category">New NFT</option>
                                        <option id="category">Old NFT</option>
                                    </select>
                                    {errors.category && (
                                        <div className="text-red-600">
                                            {errors.category.message}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="publisher" className="text-xl text-indigo-700">
                                        Vendedor
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control  focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600  block  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:outline-none"
                                        id="publisher"
                                        {...register("publisher", {
                                            required: "Por favor, digite o nome do vendedor",
                                        })}
                                    />
                                    {errors.publisher && (
                                        <div className="text-red-600">
                                            {errors.publisher.message}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="countInStock" className="text-xl text-indigo-700">
                                        Quantidade
                                    </label>
                                    <input type="number" className="form-control  focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600  block  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:outline-none"
                                        id="countInStock"
                                        {...register("countInStock", {
                                            required: "Please enter countInStock",
                                        })}
                                    />
                                    {errors.countInStock && (
                                        <div className="text-red-600">
                                            {errors.countInStock.message}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="text-xl text-indigo-700">
                                    descrição
                                </label>
                                <textarea
                                    type="text"
                                    className="form-control h-52 w-full focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600  block  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:outline-none"
                                    id="description"
                                    {...register("description", {
                                        required: "Please enter description",
                                    })}
                                />
                                {errors.description && (
                                    <div className="text-red-600">
                                        {errors.description.message}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4 flex justify-between">
                                <button
                                    onClick={() => `/admin/products`}
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
    );
}

AdminProductEditScreen.auth = { adminOnly: true }