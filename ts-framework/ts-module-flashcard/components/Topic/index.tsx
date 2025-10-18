import React from 'react'
import { useGetFlashCardQuery } from '../../apis'

function Topic() {
    const { data } = useGetFlashCardQuery(null)
    console.log("data>>", data);

    return (
        <div></div>
    )
}

export default Topic
