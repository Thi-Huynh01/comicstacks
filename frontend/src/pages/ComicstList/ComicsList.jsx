import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import './ComicsList.css'

const ComicsList = () =>  {
    const [comics, setComics] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/comics/")
        .then(response => response.json())
        .then(data => setComics(data))
        .catch(err => console.error("Fetch Error:", err));
    }, []);

    return (
        <div className={`comicsList {theme}`}>
            <title>Our Stack</title>
            <h1>
                Our Stack
            </h1>
            <ul>
                {comics.map((comic) => (
                    <li key={comic.id}>
                        <Link to={`/comics/our-stack/${comic.slug}`}>
                            <img src={comic.cover_image} alt={comic.title} width="150" />
                            <span>{comic.title}</span>
                        </Link>
                    </li>
            ))}
            </ul>
        </div>
    );
}

export default ComicsList;