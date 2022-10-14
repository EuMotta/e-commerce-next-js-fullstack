import React, { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getError } from '../utils/error'
import axios from 'axios'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Script from 'next/script'

export default function ProfileScreen() {
    const router = useRouter()
    const { data: session } = useSession()
    const {
        handleSubmit,
        register,
        getValues,
        setValue,
        formState: { errors },
    } = useForm()
    useEffect(() => {
        setValue('name', session.user.name)
        setValue('lastName', session.user.lastName)
        setValue('email', session.user.email)
    }, [session.user, setValue])
    const submitHandler = async ({ name, image, lastName, email, password }) => {
        try {
            await axios.put('/api/auth/update', {
                name,
                image,
                lastName,
                email,
                password,
            })
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            })
            toast.success('Perfil atualizado com sucesso!')
            if (result.error) {
                toast.error(result.error)
            }
        } catch (err) {
            toast.error(getError(err))
        }
    }
    return (
        <Layout title={`Perfil de ${session.user.name}`}>
            {
                session.user.isAdmin ? (
                    <Script
                        onLoad={router.push('/unauthorizedProfile')} >
                    </Script>
                ) : (
                    <form
                        className="grid md:grid-cols-6 md:gap-5"
                        onSubmit={handleSubmit(submitHandler)}
                    >
                        <h1 className="col-span-6 shadow-sm shadow-slate-400 rounded-md py-2 mb-4 text-center text-indigo-600 text-4xl">Atualizar Perfil</h1>
                        <div className='md:col-span-2 col-span-6 sm:col-span-6   md:w-3/4 sm:w-1/2  block mx-auto'>
                            <Image
                                src={`/imgUser/${session.user.name}.png`}
                                width={200}
                                height={200}
                                layout='responsive'
                                className='rounded-full  '
                            >
                            </Image>
                            <div className='text-center py-3'><button>Alterar Imagem</button></div>
                        </div>
                        <div className='md:col-span-4 p-6 col-span-6 sm:col-span-6 ml-5 card flex flex-col'>
                            <div className='w-3/4  p-5'>
                                <div className="mb-6 text-center">
                                    <h1 className='md:text-3xl sm:text-2xl text-xl flex sm:justify-center md:justify-start '>Informações da conta <i className="ri-information-line md:text-4xl"></i></h1>
                                </div>
                            </div>
                            <div className='gap-4 grid grid-cols-2'>
                                <div className='w-3/4 p-5 md:col-span-1 sm:col-span-2 col-span-2'>
                                    <div className="mb-6">
                                        <label htmlFor='name' className='text-md'>Nome</label>
                                        <input
                                            {...register('name', {
                                                required: 'Por favor, digite seu primeiro nome',
                                                minLength: { value: 3, message: 'Por favor, digite um nome válido' }
                                            })}
                                            type="name"
                                            className="form-control block w-full px-4 py-1 text-xl font-normal text-gray-800  bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"
                                            id="name"
                                        /> {errors.name && (<div className='text-sm text-red-500'>{errors.name.message}</div>)}
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
                                            className={`form-control block w-full px-4 py-1 text-xl font-normal text-gray-800 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none`}
                                            id="lastName"
                                        /> {errors.lastName && (<div className='text-sm text-red-500'>{errors.lastName.message}</div>)}
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="email" className='text-md'>E-mail</label>
                                        <input
                                            type="email"
                                            className="form-control block w-full px-4 py-1 text-md font-normal text-gray-800  bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"
                                            id="email"
                                            {...register('email', {
                                                required: 'Please enter email',
                                                pattern: {
                                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                                    message: 'Please enter valid email',
                                                },
                                            })}
                                        />
                                        {errors.email && (
                                            <div className="text-red-500">{errors.email.message}</div>
                                        )}
                                    </div>
                                </div>
                                <div className='p-5  md:col-span-1 sm:col-span-2 col-span-2'>

                                    <div className="mb-4">
                                        <label
                                            htmlFor='password'
                                            className='text-md'
                                        >Senha</label>
                                        <input
                                            type="password"
                                            {...register('password', {
                                                required: 'Por favor, digite sua senha',
                                                minLength: { value: 6, message: 'A senha deve ter mais de 6 caracteres' },
                                                pattern: {
                                                    value: /^[a-zA-Z0-9_.+-]+$/i,
                                                    message: 'Por favor, insira no mínimo 6 caracteres',
                                                },
                                            })}
                                            className="form-control block w-full px-4 py-1 text-xl font-normal text-black bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"
                                            id="password"
                                            autoFocus
                                        />{errors.password &&
                                            (
                                                <div className='text-sm flex justify-between text-red-500'>{errors.password.message}</div>
                                            )
                                        }
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor='passwordIsValid'
                                            className='text-md'
                                        >Confirmação de Senha</label>
                                        <input
                                            type="password"
                                            {...register('passwordIsValid', {
                                                required: 'Por favor, digite sua senha novamente',
                                                minLength: { value: 6, message: 'A senha deve ter mais de 6 caracteres' },
                                                validate: (value) => value === getValues('password'),
                                                pattern: {
                                                    value: /^[a-zA-Z0-9_.+-]+$/i,
                                                    message: 'As senhas deve ser iguais!',
                                                },
                                            })}
                                            id="passwordIsValid"
                                            className="form-control block w-full px-4 py-1 text-xl font-normal text-black bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"

                                        />{errors.passwordIsValid &&
                                            (
                                                <div className='text-sm flex justify-between text-red-400'>{errors.passwordIsValid.message}</div>
                                            )
                                        }
                                        {errors.passwordIsValid &&
                                            (
                                                <div className='text-sm flex justify-between text-red-400'>As senhas precisam ser iguais.</div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4 w-full flex flex-col items-end">
                                <button className="primary-button text-xl bg-white">Atualizar Perfil</button>
                            </div>
                        </div>
                    </form >
                )
            }
        </Layout >
    )
}

ProfileScreen.auth = true