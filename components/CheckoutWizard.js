import React from 'react'
import {
    HiOutlineLogin,
    HiOutlineDocumentSearch,
    HiOutlineClipboardCheck
} from 'react-icons/hi'
import { FaShippingFast } from 'react-icons/fa'

const iconSteps = [
    {
        path: 'auth',
        display: 'autenticação',
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
        path: 'placeOrder',
        display: 'Revisão',
        icon: HiOutlineClipboardCheck
    },
]
export default function CheckoutWizard({ activeStep = 0 }) {

    return (
        <div className='mb-5 flex flex-wrap'>
            {iconSteps.map(
                (step, index) => (
                    <div
                        key={step.path}
                        className={`flex-1 border-b-2 text-center text-2xl 
                        ${index <= activeStep
                                ? 'border-indigo-500 text-indigo-500'
                                : 'border-gray-400 text-gray-400'
                            }
                            `}
                    >
                        {activeStep ? '' : ''}
                        <span className='flex'>
                            <span>{step.display}</span>
                            <step>
                                <step.icon />
                            </step>
                        </span>
                    </div>

                ))
            }
        </div>
    )
}
