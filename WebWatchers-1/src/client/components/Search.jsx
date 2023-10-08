import { useState, useEffect } from 'react'
import { fetchAllWebsites } from '../API/ajaxHelper'

export default function Search() {
    const [websites, setWebsites] = useState([]);
    const [state, setState] = useState({
        query: '',
        list: []
    })

    const handleChange = async (e) => {
        const results = websites.data.websites.filter(website => {
            if (e.target.value === "") return posts
            return website.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setState({
            query: e.target.value,
            list: results
        })
    }

    useEffect(() => {
        async function allWebsitesHandler() {
            const result = await fetchAllWebsites();
            setWebsites(result);
        } allWebsitesHandler();
    }, [])

    return (
        <div className='searchbar'>
            <form className='search-form'>
                <label className='search-label'> Search
                    <input className="search-input" onChange={handleChange} value={state.query} type="search" placeholder="Search for a website..." />
                </label>
            </form>
            <ul>
                {(state.query === '' ? "" : state.list.map(website => {
                    return <li key={website.name}>{website.name}</li>
                }))}
            </ul>
        </div>
    )
}