import React from 'react'

const Filter = ({show, handle}) => {
    return (
        <div>
            filter shown with: <input value={show} onChange={handle} />
        </div>
    )
}

export default Filter