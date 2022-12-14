import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
// import Image from 'next/image'
// import loginimg from '../public/img/Register.svg'
import { signIn, useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { getError } from '../utils/error'
import { useRouter } from 'next/router'
import axios from 'axios'
import { GiFallingStar } from 'react-icons/gi'

export default function LoginScreen() {
    const { data: session } = useSession()
    const router = useRouter()
    const { redirect } = router.query
    useEffect(() => {
        if (session?.user) {
            router.push(redirect || '/')
        }
    }, [router, session, redirect])
    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
    } = useForm()
    const submitHandler = async ({ name, lastName, email, password }) => {
        try {
            await axios.post('/api/auth/signup', {
                name,
                lastName,
                email,
                password,
            })
            const result = await signIn('credentials', {
                redirect: false,
                lastName,
                email,
                password,
            })
            if (result.error) {
                toast.error(result.error)
            }
        } catch (err) {
            toast.error(getError(err))
        }
    }
    return (
        <Layout title='Registro'>
            <section className="h-full">
                <div className="px-6 h-full text-gray-800">
                    <div
                        className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
                    >
                        {/* <div
                            className="grow-0 login_img shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
                        >
                            <Image
                                src={loginimg}
                                className="w-full"
                                alt="Sample image"
                            />
                        </div> */}
                        <div className="xl:ml-20 card p-10 mb-12 md:mb-0">
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <div className='text-3xl text-center mb-10'>
                                <span className='flex text-indigo-600 justify-center'><GiFallingStar/></span>
                                    <h1>Efetuar cadastro</h1>
                                </div>
                                <div className="flex flex-row items-center justify-center lg:justify-start">
                                    <p className="text-lg mb-0 mr-4">Cadastre-se com</p>
                                    <button
                                        type="button"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                        className="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-4 h-4">
                                            <path
                                                fill="currentColor"
                                                d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                        className="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4">
                                            <path
                                                fill="currentColor"
                                                d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        data-mdb-ripple="true"
                                        data-mdb-ripple-color="light"
                                        className="inline-block p-3 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
                                            <path
                                                fill="currentColor"
                                                d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div
                                    className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                                >
                                    <p className="text-center font-semibold mx-4 mb-0">Ou</p>
                                </div>
                                <div className='flex gap-2 justify-between'>
                                    <div className="mb-6 ">
                                        <label
                                            htmlFor='name'
                                        >Nome</label>
                                        <input
                                            {...register('name', {
                                                required: 'Por favor, digite seu nome',
                                                minLength: { value: 3, message: 'O nome deve ser maior que 2 caracteres' }
                                            })}
                                            type="name"
                                            className="form-control  block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"
                                            id="name"
                                            autoFocus
                                        /> {errors.name && (<div className='text-sm text-red-500'>{errors.name.message}</div>)}
                                    </div>

                                    <div className="mb-6 ">
                                        <label
                                            htmlFor='lastName'
                                        >Sobrenome</label>
                                        <input
                                            {...register('lastName', {
                                                required: 'Por favor, digite seu sobrenome',
                                                minLength: { value: 3, message: 'O sobrenome deve ter mais de 2 caracteres' }
                                            })}
                                            type="lastName"
                                            className="form-control  block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"
                                            id="lastName"
                                            autoFocus
                                        /> {errors.lastName && (<div className='text-sm text-red-500'>{errors.lastName.message}</div>)}
                                    </div>
                                </div>
                                <div className="mb-6 ">
                                    <label
                                        htmlFor='email'
                                    >E-mail</label>
                                    <input
                                        {...register('email', {
                                            required: 'Por favor, digite seu email', pattern: {
                                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                                message: 'Por favor, digite seu email',
                                            }
                                        })}
                                        type="email"
                                        className="form-control  block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"
                                        id="email"
                                        autoFocus
                                    /> {errors.email && (<div className='text-sm text-red-500'>{errors.email.message}</div>)}
                                </div>
                                <div className='flex justify-between'>
                                    <div className="mb-6">
                                        <label
                                            htmlFor='password'
                                        >Senha</label>
                                        <input
                                            {...register('password', {
                                                required: 'Por favor, digite sua senha',
                                                minLength: { value: 6, message: 'A senha deve ter mais de 6 caracteres' },
                                                pattern: {
                                                    value: /^[a-zA-Z0-9_.+-]+$/i,
                                                    // para alterar o que eu quero, regex + o que eu quero
                                                    message: 'Por favor, digite sua senha',
                                                }
                                            })}
                                            type="password"
                                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"
                                            id="password"
                                            autoFocus
                                        />{errors.password && (<div className='text-sm text-red-500'>{errors.password.message}</div>)}
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            htmlFor='passwordIsValid'
                                        >Confirmar Senha</label>
                                        <input
                                            {...register('passwordIsValid', {
                                                required: 'Por favor, digite sua senha novamente',
                                                validate: (value) => value === getValues('password'),
                                                minLength: { value: 6, message: 'A senha deve ter mais de 6 caracteres' },
                                                pattern: {
                                                    value: /^[a-zA-Z0-9_.+-]+$/i,
                                                    // para alterar o que eu quero, regex + o que eu quero
                                                    message: 'As senhas devem ser iguais',
                                                }
                                            })}
                                            type="password"
                                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"
                                            id="passwordIsValid"
                                            autoFocus
                                        />{errors.passwordIsValid && (<div className='text-sm text-red-500'>{errors.passwordIsValid.message}</div>)}
                                        {errors.passwordIsValid && (<div className='text-sm text-red-500'>As senhas digitadas n??o s??o Iguais</div>)}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mb-6">
                                    <div className="form-group form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                            id="checkbox"
                                        />
                                        <label className="form-check-label inline-block text-gray-800" htmlFor="checkbox">Lembrar-me</label>
                                    </div>
                                    
                                </div>
                                <div className="text-center lg:text-left">
                                    <button
                                        className="inline-block w-full px-7 py-3 bg-blue-600 text-white font-medium text-md leading-snug rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                    >Cadastrar-se
                                    </button>
                                    <div className='flex justify-center'>
                                    <p className="text-md font-semibold mt-2 pt-1 mb-0">
                                        J?? possui uma conta?
                                        <Link href={`/login?redirect=${redirect || '/'} `}
                                            className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"> Entrar</Link>
                                    </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
