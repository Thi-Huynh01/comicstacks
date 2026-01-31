import React, { useState, useEffect } from 'react'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate, useParams } from "react-router-dom";
import "./ThreadDetail.css"

const ThreadDetail = () => {
    const { cat_slug, threadId } = useParams();
    const [thread, setThread] = useState(null)
    const nav = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/forums/categories/${cat_slug}/threads/${threadId}/`)
            .then((res) => res.json())
            .then((data) => setThread(data))
            .catch((err) => console.error(err));
    }, [cat_slug, threadId]);

    if (!thread) return <p className="thread-loading">Loading thread...</p>

    return (
        <div className='thread-page'>
            <div className='thread-back'>
                <Tooltip title="Back to Threads" arrow>
                    <IconButton onClick={() => nav("/community")}
                        sx={{
                            color: "#808080",
                            "&:hover": {
                                color: "#3e49dd",
                                backgroundColor: "rgba(62, 73, 221, 0.1),"
                            },
                        }}
                        >
                        <ArrowBackIosIcon/>
                    </IconButton>
                </Tooltip>
                </div>
            <title>Thread</title>
            <div className="thread-card">
                <div className="thread-header">
                    <h1 className="thread-title">{thread.title}</h1>
                    <span className='thread-category'>#{thread.category.category}</span>
            </div>

            <div className='thread-meta'>
                <span>Posted by <strong>{thread.user}</strong></span>
            </div>

            <div className='thread-body'>
                <p>{thread.body}</p>
            </div>

            {thread.image && (
                <div className='thread-image-wrapper'>
                <img
                    src={thread.image}
                    alt={thread.title}
                    className='thread-image'
                />
                </div>
            )}
            <ThumbUpAltIcon/> 0 <CommentIcon/> 0 {/*Replace with actual counter in the future.*/}
            </div>
        </div>

    );

};

export default ThreadDetail;