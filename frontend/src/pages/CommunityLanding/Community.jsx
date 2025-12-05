import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ForumIcon from '@mui/icons-material/Forum';
import './Community.css';

const CommunityLandingPage = () => {

    const [threads, setThreads] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/forums/threads/`)
            .then((res) => res.json())
            .then((data) => setThreads(data))
            .catch((err) => console.error(err));
    }, []);


    return (
        <div>
            <title>Community</title>
            <h1 className="discussion-header">
                <ForumIcon fontSize="medium"/>Discussions
            </h1>
            <div> 
                {threads.map(thread => (
                    <li key = {thread.id}>
                        <Link 
                            to= {`/community/forums/${thread.category.slug}/${thread.id}`}>
                            {thread.title}
                        </Link>
                        <p>{thread.user}</p>
                        <p>{thread.category.category}</p>
                        <p>{thread.creation_date}</p>
                    </li>
                ))}
            </div>
        </div>
    );
}

export default CommunityLandingPage;