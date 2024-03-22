import React, { useEffect, useState } from 'react'

const LiveSearch = ({ onKeySearch }) => {
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            console.log("call func onKeySearch")
            onKeySearch(keyword)
        }, 500)

        return () => clearTimeout(delayDebounce)
    }, [keyword])

    const onTyping = (event) => {
        const target = event.target;

        console.log("keyword typing=> ", target.value)

        setKeyword(target.value)
    }
    return (
        <input type="search" onChange={onTyping} value={keyword} className="form-control form-control-sm ms-1" placeholder="Email or Name" />
    )
}

export default LiveSearch