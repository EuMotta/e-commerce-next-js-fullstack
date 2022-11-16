import React from 'react'
import Layout from '../../components/Layout'
import { useForm } from 'react-hook-form'

export default function InformationSearch() {
    const { handleSubmit, register, setValue } = useForm()

    const checkCNPJ = (e) => {
        const cnpj = e.target.value.replace(/\D/g, '')
        fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`).then(res => res.json())
            .then(data => {
                console.log(data)
                setValue('razao_social', data.razao_social)
                setValue('nome_fantasia', data.nome_fantasia)
                setValue('cnpj', data.cnpj)
                setValue('cnae_fiscal_descricao', data.cnae_fiscal_descricao)
                setValue('situacao_cadastral', data.situacao_cadastral)
                setValue('cnae_fiscal', data.cnae_fiscal)
                setValue('natureza_juridica', data.natureza_juridica)
                setValue('situacao_cadastral', data.situacao_cadastral)
                setValue('descricao_situacao_cadastral', data.descricao_situacao_cadastral)
                setValue('data_situacao_cadastral', data.data_situacao_cadastral)
                setValue('bairro', data.bairro)
                setValue('complemento', data.complemento)
                setValue('cep', data.cep)
                setValue('logradouro', data.logradouro)
                setValue('uf', data.uf)
                setValue('descricao_tipo_de_logradouro', data.descricao_tipo_de_logradouro)
                setValue('ddd_telefone_1', data.ddd_telefone_1)
                setValue('ddd_telefone_2', data.ddd_telefone_2)
                setValue('email', data.email)
            })
    }
    const checkTaxa = (e) => {
        const sigla = e.target.value.replace()
        fetch(`https://brasilapi.com.br/api/taxas/v1/${sigla}`).then(res => res.json())
            .then(data => {
                console.log(data)
                setValue('nome', data.nome)
                setValue('valor', data.valor)
            })
    }
    const checkDomain = (e) => {
        const domain = e.target.value.replace()
        fetch(`https://brasilapi.com.br/api/registrobr/v1/${domain}`).then(res => res.json())
            .then(data => {
                console.log(data)
                setValue('status', data.status)
                setValue('fqdn', data.fqdn)
            })
    }

    return (
        <Layout title='Perfil Admin'>
            <div className=''>
                <div className="mb-4 grid col-span-1">


                </div>

                <div className='grid grid-cols-6 gap-5'>
                    <div className='border-4 col-span-4 rounded-lg p-10 bg-slate-50 shadow-sm shadow-slate-600'>
                        <span className='text-center my-2'>
                            <h2 className='text-5xl'><span className='text-indigo-600'>Pesquisar </span> Empresas</h2>
                        </span>
                        <div className='flex justify-center mt-5'>
                            <input
                                placeholder='insira o CNPJ'
                                className="form-control  block w-1/3 px-4 text-center py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"
                                onBlurCapture={checkCNPJ}
                            />
                        </div>
                        <div>
                            <form onSubmit={handleSubmit((data) => console.log(data))}>
                                <div className='mt-4 pb-5  border border-slate-400  shadow-sm shadow-slate-600  p-2'>
                                    <div className='text-center text-md mb-2 '>Nome/CNPJ</div>
                                    <div className='flex gap-5'>
                                        <div className="text-md w-1/3 p-2 text-center shadow  shadow-slate-600 py-2">
                                            <label className='text-md text-indigo-700' htmlFor="razao_social">Razão Social</label>
                                            <input
                                                {...register("razao_social")}
                                                placeholder='Não encontrado'
                                                className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white "
                                            />
                                        </div>
                                        <div className="text-md w-1/3 p-2 text-center shadow  shadow-slate-600 py-2">
                                            <label className='text-md text-indigo-700' htmlFor="nome_fantasia">Nome fantasia</label>
                                            <input
                                                {...register("nome_fantasia")}
                                                placeholder='Não encontrado'
                                                className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white  "
                                            />
                                        </div>
                                        <div className="text-md w-1/3 p-2 text-center shadow  shadow-slate-600 py-2">
                                            <label className='text-md text-indigo-700' htmlFor="cnpj">CNPJ</label>
                                            <input
                                                {...register("cnpj")}
                                                placeholder='Não encontrado'
                                                className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white  "
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-4 pb-5  border border-slate-400  shadow-sm shadow-slate-600  p-2'>
                                    <div className='text-center text-md mb-2 '>CNAE</div>
                                    <div className='flex gap-5'>
                                        <div className="text-md p-2 w-2/4 text-center shadow  shadow-slate-600 py-2">
                                            <label className='text-md text-indigo-700' htmlFor="cnae_fiscal">CNAE Fiscal</label>
                                            <input
                                                {...register("cnae_fiscal")}
                                                placeholder='Não encontrado'
                                                className="form-control text-sm w-full  block text-center font-normal text-gray-700 bg-white  "
                                            />
                                        </div>
                                        <div className="text-md p-2 w-2/4 text-center shadow  shadow-slate-600 py-2">
                                            <label className='text-md text-indigo-700' htmlFor="cnae_fiscal_descricao">CNAE Fiscal Descrição</label>
                                            <input
                                                {...register("cnae_fiscal_descricao")}
                                                placeholder='Não encontrado'
                                                className="form-control text-sm w-full  block text-center font-normal text-gray-700 bg-white  "
                                            />
                                        </div>

                                    </div>
                                </div>
                                <div className='mt-4 pb-5  border border-slate-400  shadow-sm shadow-slate-600  p-2'>
                                    <div className='text-center text-md mb-2 '>Natureza/Situação</div>
                                    <div className='flex gap-5'>
                                        <div className="text-md p-2 w-1/3 text-center shadow  shadow-slate-600 py-2">
                                            <label className='text-md text-indigo-700' htmlFor="natureza_juridica">Natureza Juridíca</label>
                                            <input
                                                {...register("natureza_juridica")}
                                                placeholder='Não encontrado'
                                                className="form-control text-sm w-full  block text-center font-normal text-gray-700 bg-white  "
                                            />
                                        </div>
                                        <div className="text-md p-2 w-1/4 text-center shadow  shadow-slate-600 py-2">
                                            <label className='text-md text-indigo-700' htmlFor="situacao_cadastral">Situação cadastral</label>
                                            <div className='flex'>
                                                <input
                                                    {...register("situacao_cadastral")}
                                                    placeholder='Não encontrado'
                                                    className="form-control text-sm w-1/2  block text-center font-normal text-gray-700 bg-white  "
                                                />
                                                <span>:</span>
                                                <input
                                                    {...register("descricao_situacao_cadastral")}
                                                    placeholder='Não encontrado'
                                                    className="form-control text-sm w-1/2  block text-center font-normal text-gray-700 bg-white  "
                                                />
                                            </div>
                                        </div>
                                        <div className="text-md p-2 w-1/3 text-center shadow  shadow-slate-600 py-2">
                                            <label className='text-md text-indigo-700' htmlFor="data_situacao_cadastral">Situação cadastral Data</label>
                                            <input
                                                {...register("data_situacao_cadastral")}
                                                placeholder='Não encontrado'
                                                className="form-control text-sm w-full  block text-center font-normal text-gray-700 bg-white  "
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-4 pb-5  border border-slate-400  shadow-sm shadow-slate-600  p-2'>
                                    <div className='text-center text-md mb-2 '>Endereço</div>
                                    <div className='flex gap-5'>
                                        <div className="text-md p-2 w-1/5 text-center shadow  shadow-slate-600 py-2">
                                            <label className='text-md text-indigo-700' htmlFor="descricao_tipo_de_logradouro">Tipo</label>
                                            <div className='flex'>
                                                <input
                                                    {...register("descricao_tipo_de_logradouro")}
                                                    placeholder='Não encontrado'
                                                    className="form-control text-sm w-full  block text-center font-normal text-gray-700 bg-white  "
                                                />
                                            </div>
                                        </div>
                                        <div className="text-md p-2 w-2/4 text-center shadow  shadow-slate-600 py-2">
                                            <label className='text-md text-indigo-700' htmlFor="natureza_juridica">Logradouro</label>
                                            <div className='flex'>
                                                <input
                                                    {...register("logradouro")}
                                                    placeholder='Não encontrado'
                                                    className="form-control text-sm w-full  block text-center font-normal text-gray-700 bg-white  "
                                                />
                                            </div>
                                        </div>
                                        <div className="text-md p-2 w-2/4 text-center shadow  shadow-slate-600 py-2">
                                            <label className='text-md text-indigo-700' htmlFor="natureza_juridica">Complemento</label>
                                            <div className='flex'>
                                                <input
                                                    {...register("complemento")}
                                                    placeholder='Não encontrado'
                                                    className="form-control text-sm w-full  block text-center font-normal text-gray-700 bg-white  "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex gap-5'>
                                        <div className="text-md mt-5 p-2 w-3/5 text-center shadow  shadow-slate-600 py-2">
                                            <label className='text-md text-indigo-700' htmlFor="descricao_tipo_de_logradouro">Bairro</label>
                                            <div className='flex'>
                                                <input
                                                    {...register("bairro")}
                                                    placeholder='Não encontrado'
                                                    className="form-control text-sm w-full  block text-center font-normal text-gray-700 bg-white  "
                                                />
                                            </div>
                                        </div>
                                        <div className="text-md mt-5 p-2 w-1/5 text-center shadow  shadow-slate-600 py-2">
                                            <label className='text-md text-indigo-700' htmlFor="descricao_tipo_de_logradouro">CEP</label>
                                            <div className='flex'>
                                                <input
                                                    {...register("cep")}
                                                    placeholder='Não encontrado'
                                                    className="form-control text-sm w-full  block text-center font-normal text-gray-700 bg-white  "
                                                />
                                            </div>
                                        </div>
                                        <div className="text-md mt-5 p-2 w-1/5 text-center shadow  shadow-slate-600 py-2">
                                            <label className='text-md text-indigo-700' htmlFor="descricao_tipo_de_logradouro">UF</label>
                                            <div className='flex'>
                                                <input
                                                    {...register("uf")}
                                                    placeholder='Não encontrado'
                                                    className="form-control text-sm w-full  block text-center font-normal text-gray-700 bg-white  "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-4 pb-5  border border-slate-400  shadow-sm shadow-slate-600  p-2'>
                                    <div className='text-center text-md mb-2 '>Contato</div>
                                    <div className='flex gap-5'>
                                        <div className="text-md p-2 w-1/5 text-center shadow  shadow-slate-600 py-2">
                                            <label className='text-md text-indigo-700' htmlFor="ddd_telefone_1">Telefone 1</label>
                                            <div className='flex'>
                                                <input
                                                    {...register("ddd_telefone_1")}
                                                    placeholder='Não encontrado'
                                                    className="form-control text-sm w-full  block text-center font-normal text-gray-700 bg-white  "
                                                />
                                            </div>
                                        </div>
                                        <div className="text-md p-2 w-1/5 text-center shadow  shadow-slate-600 py-2">
                                            <label className='text-md text-indigo-700' htmlFor="ddd_telefone_2">Telefone 2</label>
                                            <div className='flex'>
                                                <input
                                                    {...register("ddd_telefone_2")}
                                                    placeholder='Não encontrado'
                                                    className="form-control text-sm w-full  block text-center font-normal text-gray-700 bg-white  "
                                                />
                                            </div>
                                        </div>
                                        <div className="text-md p-2 w-3/5 text-center shadow  shadow-slate-600 py-2">
                                            <label className='text-md text-indigo-700' htmlFor="email">Email</label>
                                            <div className='flex'>
                                                <input
                                                    {...register("email")}
                                                    placeholder='Não encontrado'
                                                    className="form-control text-sm w-full  block text-center font-normal text-gray-700 bg-white  "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div className='border-4 col-span-2 rounded-lg p-10 bg-slate-50 shadow-sm shadow-slate-600'>
                        <div>
                            <span className='text-center my-2'>
                                <h2 className='text-5xl'><span className='text-indigo-600'></span>Taxas</h2>
                            </span>
                            <div className='flex justify-center mt-5'>
                                <input
                                    placeholder='Nome/tipo'
                                    className="form-control  block w-full px-4 text-center py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"
                                    onBlurCapture={checkTaxa}
                                />
                            </div>
                            <div>
                                <form onSubmit={handleSubmit((data) => console.log(data))}>
                                    <div className='mt-4 pb-5  border border-slate-400  shadow-sm shadow-slate-600  p-2'>
                                        <div className='text-center text-md mb-2 '>Valor da Taxa</div>
                                        <div className='flex gap-5'>
                                            <div className="text-md  p-2 text-center shadow  shadow-slate-600 py-2">
                                                <label className='text-md text-indigo-700' htmlFor="valor">Nome</label>
                                                <input
                                                    {...register("nome")}
                                                    placeholder='Não Encontrado'
                                                    className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white  "
                                                />
                                            </div>
                                            <div className="text-md  p-2 text-center shadow  shadow-slate-600 py-2">
                                                <label className='text-md text-indigo-700' htmlFor="valor">Taxa</label>
                                                <input
                                                    {...register("valor")}
                                                    placeholder='Não Encontrado'
                                                    className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white  "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className='mt-5'>
                            <span className='text-center my-2'>
                                <h2 className='text-5xl'><span className='text-indigo-600'></span>Domínio</h2>
                            </span>
                            <div className='flex justify-center mt-5'>
                                <input
                                    placeholder='Nome/tipo'
                                    className="form-control  block w-full px-4 text-center py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-white focus:shadow-md focus:shadow-slate-500 focus:bg-indigo-300 focus:border-blue-600 focus:outline-none"
                                    onBlurCapture={checkDomain}
                                />
                            </div>
                            <div>
                                <form onSubmit={handleSubmit((data) => console.log(data))}>
                                    <div className='mt-4 pb-5  border border-slate-400  shadow-sm shadow-slate-600  p-2'>
                                        <div className='text-center text-md mb-2 '>Status</div>
                                        <div className='flex gap-5'>
                                            <div className="text-md  p-2 text-center shadow  shadow-slate-600 py-2">
                                                <label className='text-md text-indigo-700' htmlFor="valor">Status</label>
                                                <input
                                                    {...register("status")}
                                                    placeholder='Não Encontrado'
                                                    className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white  "
                                                />
                                            </div>
                                            <div className="text-md  p-2 text-center shadow  shadow-slate-600 py-2">
                                                <label className='text-md text-indigo-700' htmlFor="valor">Dominio</label>
                                                <input
                                                    {...register("fqdn")}
                                                    placeholder='Não Encontrado'
                                                    className="form-control text-sm w-full block text-center font-normal text-gray-700 bg-white  "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout >
    )
}