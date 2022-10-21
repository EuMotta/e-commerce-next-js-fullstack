
import React from 'react'
import { useState } from 'react';

export default function teste() {
    const [imageSrc, setImageSrc] = useState();
    const [uploadData, setUploadData] = useState();

    /**
     * handleOnChange
     * @description Triggers when the file input changes (ex: when a file is selected)
     */

    function handleOnChange(changeEvent) {
        const reader = new FileReader();

        reader.onload = function (onLoadEvent) {
            setImageSrc(onLoadEvent.target.result);
            setUploadData(undefined);
        }

        reader.readAsDataURL(changeEvent.target.files[0]);
    }

    /**
     * handleOnSubmit
     * @description Triggers when the main form is submitted
     */

    async function handleOnSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;
        const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');

        const formData = new FormData();

        for (const file of fileInput.files) {
            formData.append('file', file);
        }

        formData.append('upload_preset', 'my-uploads');

        const data = await fetch(`https://api.cloudinary.com/v1_1/dqezidbmw/upload`, {
            method: 'POST',
            body: formData
        }).then(r => r.json());

        setImageSrc(data.secure_url);
        setUploadData(data);
    }

    return (
        <div className="">
            <main className="">
                <h1 className="">
                    TESTE
                </h1>
                <p className="">
                    VAMO UPAR PORRA!
                </p>
                <form className="" method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
                    <p>
                        <input type="file" name="file" />
                    </p>
                    <img src={imageSrc} />
                    {imageSrc && !uploadData && (
                        <p>
                            <button>CLICA AQUI PORRA</button>
                        </p>
                    )}
                    {uploadData && (
                        <code><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>
                    )}
                </form>
            </main>
        </div>
    )
}