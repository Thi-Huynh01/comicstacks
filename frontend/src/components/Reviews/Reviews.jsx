import React, { useEffect, useState } from "react";
import './Reviews.css';

const Reviews = ( { slug }) => {

    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    //const token = sessionStorage.getItem("access");
    const token = localStorage.getItem("access");
    console.log("token: ", token);
    console.log(slug);
    const isLoggedIn = !!token;

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/comics/${slug}/reviews/`)
            .then((res) => res.json())
            .then((data) => setReviews(data))
            .catch((err) => console.error(err));
    }, [slug]);

    async function handleSubmit(e) {
        e.preventDefault();

        if(!slug) {
            console.error("Comic slug is undefined!");
            return;
        }

        if(!token) {
            alert("You must be logged in to post a review");
            return;
        }

        const res = await fetch (
            `http://127.0.0.1:8000/api/comics/${slug}/reviews/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ 
                    subject: "test",
                    body: newReview,
                    rating: 5 
                }),

            }
        );

        if (res.ok) {
            setNewReview("");
            const updated = await res.json();
            setReviews([...reviews, updated]);
            alert("Review Posted");
        } else {
            const errorData = await res.json();
            console.log("POST failed:", errorData);
            alert("Failed to post review");
        }
    }

    return (
        <div className="reviews">
            <h2>Reviews</h2>
            {isLoggedIn && (
                <form onSubmit={handleSubmit}>
                    <textarea
                        placeholder="Write a review..."
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        style={{ width: "100%", height: "100px" }}
                    />
                    <button type="submit">Submit Review</button>
                </form>
            )}

            {!isLoggedIn && (
                <p style={{ marginTop: "20px" }}>
                    <em>Log in to post a review. </em>
                </p>
            )}

            {reviews.length > 0 ? (
                reviews.map((review,index) => (
                    <div
                        key={index}
                        style={{
                            borderBottom: "1px solid #ccc",
                            marginBottom: "10px",
                            paddingBottom: "10px"
                        }}
                    >
                        <strong>{review.user}</strong>
                        <p>{review.body}</p>
                    </div>
                ))
            ): (
                <p>No reviews yet.</p>
            )}
        </div>
    );
};

export default Reviews;