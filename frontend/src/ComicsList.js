import { useEffect, useState } from "react";

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
                    <li key={comic.id}>{comic.title}</li>
            
            ))}
            </ul>
        </div>
    );
}

export default ComicsList;