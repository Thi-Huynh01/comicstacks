import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ForumIcon from '@mui/icons-material/Forum';
import TagIcon from '@mui/icons-material/Tag';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CircleIcon from '@mui/icons-material/Circle';
import './Community.css';

const CommunityLandingPage = () => {

    const [threads, setThreads] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/forums/threads/`)
            .then((res) => res.json())
            .then((data) => setThreads(data))
            .catch((err) => console.error(err));
    }, []);

    const reformDate = (dateString) => {
        const dateObj = new Date(dateString);
        const options = {
            year:'numeric',
            month:'long',
            day:'numeric'
        };
        const formattedDate = dateObj.toLocaleDateString("en-US", options);
    
        console.log(threads.creation_date);
        return formattedDate;
    }

    return (
        <div className="discussion-container">
            <title>Community</title>
            <h1 className="discussion-header">
                <ForumIcon fontSize="medium"/>Discussions
            </h1>
            <div className="discussion-list"> 
                {threads.map(thread => (
                    <div className='discussion-card'key = {thread.id}>
                        <Link 
                            to= {`/community/forums/${thread.category.slug}/${thread.id}`}
                            className="discussion-title"
                            >
                            {thread.title}
                        </Link>
                        <p className="discussion-meta">
                            <TagIcon fontSize="small" 
                            />{thread.category.category}
                        </p>
                        <p className="discussion-bottom">
                            <span className="discussion-user">
                                <AccountBoxIcon fontSize="medium"/>
                                {thread.user}
                            </span>
                            <span className="discussion-date">
                                {reformDate(thread.creation_date)}
                            </span>
                        </p>                
                    </div>
                ))}
            </div>
        </div>
    );
}


export default CommunityLandingPage;