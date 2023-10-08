import { useState } from 'react'
import { createWebsite } from '../API/ajaxHelper'
import { useNavigate } from 'react-router-dom'

export default function AdminCreateWebsite(adminLoggedIn) {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        
        try {
            await createWebsite(
                name,
                url,
                description,
                image,
            );
        } catch (error) {
            console.error('Could not make website', error);
        }
        navigate('/admin/websites');
    }

    return (
        <>
        {adminLoggedIn ? (
            <div className='create-post'>
            <h1 className='create-header'>Create new website</h1>
            <form className="create-form" onSubmit={handleSubmit}>
                <label className='create-label'>
                    Name: {' '}
                    <input
                    className='create-input'
                    type="text"
                    name="name"
                    placeholder="Name of website"
                    required={true}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label className='create-label'>
                    URL: {' '}
                    <input
                    className='create-input'
                    type="text"
                    name="url"
                    placeholder="Website URL"
                    required={true}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    />
                </label>
                <label className='create-label'>
                    Description: {' '}
                    <input
                    className='create-input'
                    type="text"
                    name="description"
                    placeholder="Description"
                    required={true}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label className='create-label'>
                    Image URL: {' '}
                    <input
                    className='create-input'
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    required={true}
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    />
                </label>
                <button className="post-button">Create Website</button>
            </form>
        </div>
        ): (<h1>Please Login!</h1>)}
        </>     
    )
}