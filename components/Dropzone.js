import axios from 'axios'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { RiImageAddFill } from 'react-icons/ri'
import { BsImages } from 'react-icons/bs'

export default function Dropzone() {
    function handleUpload() {
        console.log("Enviando Arquivos...")
        axios.post('http://localhost:4000/upload', { images }).then(response => {
            console.log(response.data)
        })
            .catch(error => {
                console.log(error.message)
            })
    }
    const [images, setImages] = useState([])
    const onDrop = useCallback((acceptedFiles, rejectFiles) => {
        acceptedFiles.forEach(file => {
            const reader = new FileReader()
            reader.onload = () => {
                setImages(prevState => [...prevState, reader.result])
            }
            reader.readAsDataURL(file)
        })
        console.log('acceptedFiles', acceptedFiles)
        console.log('rejectFiles', rejectFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg', '.webp'],
        },
    })
    useEffect(() => {
        console.log(images)
    }, [images])

    // console.log(getInputProps(), getRootProps())

    return (
        <div className='h-fit card p-5'>
            <div {...getRootProps()} className='w-full shadow-md bg-sky-100 rounded-xl p-5 border-2 cursor-pointer border-gray-600 text-center border-dotted'>
                <input {...getInputProps()} />
                {isDragActive ?
                    (
                        <div>
                            <span className='flex justify-center text-5xl'>
                                <RiImageAddFill />
                            </span>
                            Solte sua imagem
                        </div>
                    ) : (
                        <div className=''>
                            <span className='flex justify-center text-5xl'>
                                <BsImages />
                            </span>
                            Clique aqui ou arraste as imagens
                        </div>
                    )
                }<div className='flex gap-x-4 basis basis-10'>

                    {images.map((image, index) => (
                        <div
                            className='flex  justify-between'
                            key={index}
                        >

                            <Image
                                src={image}
                                width={100}
                                height={100}
                                unoptimized
                                className='transition-all z-10'
                                alt=''
                            /></div>

                    ))}</div>
            </div>
            {images.length > 0 &&
                <div className='flex'>

                    {images.length > 0 &&
                        <div>
                            <button onClick={handleUpload}>
                                Enviar
                            </button>
                        </div>
                    }
                </div>
            }
        </div>
    )
}
