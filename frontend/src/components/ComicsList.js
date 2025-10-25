import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
function ComicsList() {
    const [comics, setComics] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/comics/")
        .then(response => response.json())
        .then(data => setComics(data))
        .catch(err => console.error("Fetch Error:", err));
    }, []);

    return (
        <div>
            <h1>
                Comics
            </h1>
            <ul>
                {comics.map((comic) => (
                    <li key={comic.id}>
                    <Link to={`/comics/${comic.slug}`}>{comic.title}</Link>
                    </li>
            ))}
            </ul>
        </div>
    );
}

export default ComicsList;