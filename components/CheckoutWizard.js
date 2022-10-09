import { useRouter } from 'next/router'
import React from 'react'

export default function CheckoutWizard({ activeStep = 0 }) {
    const router = useRouter()
    return (
        <div className='mb-5 flex flex-wrap'>
            {['Login do usuário', 'Endereço de entrega', 'Método de pagamento', 'Revisão do pedido'].map(
                (step, index) => (
                    <a onClick={() => router.push('login?redirect=shipping')} 
                    className='cursor-pointer flex-1 border-b-2 text-center text-2xl'>
                        <div
                            key={index}
                            className={`flex-1 border-b-2 text-center text-2xl 
                         ${index <= activeStep
                                    ? 'border-indigo-500 text-indigo-500'
                                    : 'border-gray-400 text-gray-400'
                                }
                            `}
                        >
                            {step}
                        </div>
                    </a>
                ))
            }
        </div>
    )
}
