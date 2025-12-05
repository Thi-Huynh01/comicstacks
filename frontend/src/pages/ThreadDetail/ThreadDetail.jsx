import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";


const ThreadDetail = () => {
    const { cat_slug, threadId } = useParams();
    const [thread, setThread] = useState(null)

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/forums/categories/${cat_slug}/threads/${threadId}/`)
            .then((res) => res.json())
            .then((data) => setThread(data))
            .catch((err) => console.error(err));
    }, [cat_slug, threadId]);

    if (!thread) return <p>Loading thread...</p>

    return (
        <div className='thread-page'>
            <h1>
                {thread.title}
            </h1>
            <h2>
                #{thread.category.category}
            </h2>

            <p>
                {thread.body}
            </p>
            <p>
                {thread.user}
            </p>
        </div>

    );

}

export default ThreadDetail;