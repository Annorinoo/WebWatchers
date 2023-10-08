import { useState, useEffect } from 'react'
import { fetchAllWebsites } from "../API/ajaxHelper";

export default function WebsiteSearch() {
    const [websites, setWebsites] = useState([]);
    const [state, setState] = useState({query: '', list: []})

    const handleChange = async (e) => {
        const results = websites.data.websites.filter(website => {
            if (e.target.value === '') return websites
            return website.title.toLowerCase().includes(e.target.value.toLowerCase())
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
            <h1 className='searchbarHeader'>Search for a websites!</h1>
            <h3 className='searchbarFooter'>It will find websites using letters typed</h3>
            <form className='searchForm'>
                <label className='searchbarText'> Searchbar
                    <input className='searchbarInfo' onChange={handleChange} value={state.query} type='search' placeholder='Search for an item' />
                </label>
            </form>
            <ul>
                {(state.query === '' ? '' : state.list.map(website => {
                    return <li key={website.title}>{website.title}</li>
                }))}
            </ul>
        </div>
    )
}
