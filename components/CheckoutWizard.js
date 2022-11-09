import React from 'react'
import {
    HiOutlineLogin,
    HiOutlineDocumentSearch,
    HiOutlineClipboardCheck
} from 'react-icons/hi'
import { FaShippingFast } from 'react-icons/fa'
import { AiOutlineLoading } from 'react-icons/ai'
import { useRouter } from 'next/router'

const iconSteps = [
    {
        path: 'login',
        display: 'Autenticação',
        icon: HiOutlineLogin
    },
    {
        path: 'shipping',
        display: 'Endereço',
        icon: FaShippingFast
    },
    {
        path: 'payment',
        display: 'Forma de Pagamento',
        icon: HiOutlineDocumentSearch
    },
    {
        path: 'placeorder',
        display: 'Revisão',
        icon: HiOutlineClipboardCheck
    },
]
export default function CheckoutWizard({ activeStep = 0 }) {
    const router = useRouter()
    return (
        <div className='mb-5 gap-x-3 flex flex-wrap'>
            {iconSteps.map(
                (step, index) => (
                    <div
                        key={step.path}
                        className={`flex-1 border-b-4 text-center text-2xl 
                        ${index <= activeStep
                                ? 'border-indigo-500 text-indigo-500'
                                : 'border-gray-400 text-gray-400'
                            }
                            `}
                    >
                        <span className='!flex !flex-col cursor-pointer !items-center card py-3' onClick={() => router.push(`/${step.path}`)}>
                            <span>{step.display}</span>
                            <step>
                                {index == activeStep
                                    ? <AiOutlineLoading className='rotating text-2xl' /> : <step.icon />
                                }
                                
                            </step>
                        </span>
                    </div>

                ))
            }
        </div>
    )
}
