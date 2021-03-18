import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getLoading, searchAsync, } from '../searchSlice'
import useDebounce from '../../../hooks/useDebounce'
import './Search.css'

const Search = () => {
    const [searchText, setSearchText] = useState('')
    const dispatch = useDispatch()
    const searchTextDebounce = useDebounce(searchText, 250)

    const onSearch = (event) => {
        setSearchText(event.target.value)
    }

    useEffect(() => {
        dispatch(searchAsync(searchTextDebounce))
    }, [searchTextDebounce])
    return (
        <div className="search-container">
            <div>
                <input className="search-input" type="text" placeholder="Search movies title" value={searchText} onChange={onSearch} />
                <button className="search-icon"><i className="fa fa-search"></i></button>
            </div>
            {useSelector(getLoading) && <p>Loading...</p>}
        </div>
    )
}

export default Search