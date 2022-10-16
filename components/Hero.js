import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import nftimg from '../public/img/bg_img.png'
import cardimg1 from '../public/img/imgcard1.png'
import { useSession } from 'next-auth/react'

export default function Hero() {
  const { data: session } = useSession()
  return (
    <div className="grid grid-cols-1 mb-28 md:grid-cols-1 bg_img lg:grid-cols-2 sm:grid-cols-1 gap-4">
      <div className="col-span-1 text-center">
        <Image
          src={nftimg}
          className="w-full "
          alt="Sample image"
          layout="responsive"
          width={350}
          height={350}
        />
      </div>
      <div className="col-span-1 mt-24  flex flex-col justify-between">
        <div className="my-10">
          <h1 className="text-5xl lg:ml-10 lg:text-left md:text-center sm:text-center text-center  text-slate-600">
            Descubra, colecione e venda
            <span className="text-indigo-600">NFT&apos;S Incríveis!</span>
          </h1>
          <p className="text-2xl lg:ml-10 lg:text-left md:text-center sm:text-center text-center text-slate-600 mt-10 lg:w-4/5">nfTrade é uma das maiores plataformas NFT do mercado, descubra as Melhores Coleções de NFTs Únicas e Exclusivas! </p>
          <div className="flex lg:ml-10 lg:justify-start md:justify-around sm:justify-around justify-around mt-10">
            <div className="mr-4 ">
              <button className="p-5 px-8 text-xl">Descobrir</button>
            </div>
            <div className="mx-4">
              {session?.user ? ('') : (
                <Link href={'/register'}>
                  <button
                    className="p-5 px-8 bg-indigo-600 text-white text-xl">Cadastre-se
                  </button>
                </Link>)}
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-3'>
        <div className='col-span-1'>
          <div class="container mt-20">
            <div class="card2">
              <div class="lines"></div>
              <div class="imageBox ">
                <Image
                  src={cardimg1}
                  className="w-full "
                  alt="Sample image"
                  layout="responsive"
                  width={350}
                  height={350}
                />
              </div>
              <div class="content shadow-lg shadow-black">
                <div class="details">
                  <h2>Hero Cat Glasses <br /> <span>Love Cat NFT</span></h2>
                  <div class="info">
                    <h3>Categoria <br /><span>Nft</span></h3>
                    <h3>Valor <br /><span>R$ 340</span></h3>
                    <h3>Ofertas <br /><span>31</span></h3>
                  </div>
                  <div class="actions">
                    <button>Comprar</button>
                    <button>Saiba Mais</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Hero.auth = true
