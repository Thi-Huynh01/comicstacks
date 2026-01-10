import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import './ComicsDetail.css'
import Reviews from "../../components/Reviews/Reviews";
import authFetch from "../../utils/authFetch";
import Stack from '@mui/material/Stack';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import Button from '@mui/material/Button';

const ComicDetail = () => {
    const { slug } = useParams();
    const [comic, setComic] = useState(null);
    const [userComic, setUserComic] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/comics/${slug}/`)
        .then((res) => res.json())
        .then((data) => setComic(data))
        .catch((err) => console.error("Fetch Error: ", err))
    }, [slug]);

    useEffect(() => {
        if (!comic) return;

        authFetch(`http://127.0.0.1:8000/api/profile/comics/?comic=${comic.id}`)
        .then(res => res.json())
        .then(data => {
            if (data.length > 0) {
                setUserComic(data[0]);
            }
        })
        .catch(err => console.error("UserComic fetch error:", err));
    }, [comic]);

    function setStatus(status) {
        if (!comic) return;

        const method = userComic ? "PATCH" : "POST";
        const url = userComic
        ? `http://127.0.0.1:8000/api/profile/comics/${userComic.id}/`
        : `http://127.0.0.1:8000/api/profile/comics/`;

        authFetch(url, {
            method,
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify({
                comic: comic.id,
                status,
            }),
        })
        .then(res => res.json())
        .then(data => setUserComic(data))
        .catch(err => console.error("SetStatus error: ", err));

    }

    if (!comic) return <p>Loading...</p>;

    return (
        <div className={`comicsDetail {theme}`}>
            <title>{comic.title}</title>
            <h1>{comic.title}</h1>
            
            <Stack direction="row" spacing={1}>
            <Button
                startIcon={<BeenhereIcon />}
                sx={{
                    fontSize: '16px',
                    color: '#4caf50',
                    }}
                onClick={() => setStatus("read")}
                >
                Read
            </Button>
            <Button
                startIcon={<AutoStoriesIcon />}
                sx={{
                    fontSize:'16px',
                    color: '#3e49ddff',
                    }}
                onClick={() => setStatus("reading")}
                >
                Currently Reading
            </Button>
            <Button
                startIcon={<BookmarkAddIcon />}
                sx={{
                    fontSize:'16px',
                    color: '#cc0000ff',
                    }}
                onClick={() => setStatus("wishlist")}
                >
                Add to Readlist
            </Button>
            </Stack>

            <div style={{ display: "flex", gap: "40px", padding: "20px" }}>
                <div style={{ flex: 1 }}>
                    <img 
                        src={comic.cover_image} 
                        alt={comic.title} 
                        width="400"
                    />
                    <p>Issue #{comic.issue_no}</p>
                    <p>Release Date: {comic.release_date}</p>
                    <p>Author: {comic.author.name}</p>
                    <p>Publisher: {comic.publisher.name}</p>
                </div>
            </div>
                    <Reviews slug={slug}/>
        </div>
    );

};

export default ComicDetail;