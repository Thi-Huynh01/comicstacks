import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

function ComicDetail() {
    const { slug } = useParams();
    const [comic, setComic] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/comics/${slug}/`)
        .then((res) => res.json())
        .then((data) => setComic(data));
    }, [slug]);

    if (!comic) return <p>Loading...</p>;

    return (
        <div>
            <h1>
                {comic.title}
            </h1>
            <img src={comic.cover_image} alt={comic.title} width="400" />
            <p>Issue # {comic.issue_no}</p>
            <p>Release Date: {comic.release_date}</p>
        </div>
    );

}

export default ComicDetail;
