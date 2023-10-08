import { useState, useEffect } from 'react'
import { fetchAllReviews } from '../API/ajaxHelper.js';

export default function ReviewSearch() {
    const [reviews, setReviews] = useState([]);
    const [state, setState] = useState({query: '', list: []})

    const handleChange = async (e) => {
        const results = reviews.data.reviews.filter(review => {
            if (e.target.value === '') return reviews
            return review.title.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setState({
            query: e.target.value,
            list: results
        })
    }

    useEffect(() => {
        async function allReviewHandler() {
            const result = await fetchAllReviews();
            setReviews(result);
        } allReviewHandler();
    }, [])

    return (
        <div className='searchbar'>
            <h1 className='searchbarHeader'>Search for a post!</h1>
            <h3 className='searchbarFooter'>It will find post using letters typed</h3>
            <form className='searchForm'>
                <label className='searchbarText'> Searchbar
                    <input className='searchbarInfo' onChange={handleChange} value={state.query} type='search' placeholder='Search for an item' />
                </label>
            </form>
            <ul>
                {(state.query === '' ? '' : state.list.map(review => {
                    return <li key={review.title}>{review.title}</li>
                }))}
            </ul>
        </div>
    )
}
