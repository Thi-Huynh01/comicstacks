import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authFetch from "../../utils/authFetch";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./Profile.css";

const Profile = () => {
    const [userComics, setUserComics] = useState([]);
    const [filter, setFilter] = useState("all");
    const [profile, setProfile] = useState(null);

    // Fetch profile info (username, bio)
    useEffect(() => {
        authFetch("http://127.0.0.1:8000/api/profiles/me/")
            .then(res => res.json())
            .then(data => setProfile(data))
            .catch(err => console.error("Profile fetch error:", err));
    }, []);

    // Fetch user comics
    useEffect(() => {
        const url =
            filter === "all"
                ? "http://127.0.0.1:8000/api/profile/comics/"
                : `http://127.0.0.1:8000/api/profile/comics/?status=${filter}`;

        authFetch(url)
            .then(res => res.json())
            .then(data => setUserComics(data))
            .catch(err => console.error("User comics fetch error:", err));
    }, [filter]);

    const stats = userComics.reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
    }, {});

    return (
        <div className="profile-container">
            <title>Profile</title>
            {/* Profile Header */}
            {profile && (
                <div className="profile-header">
                    <h1>{profile.username}</h1>
                    {profile.prof_desc && <p>{profile.prof_desc}</p>}

                    <div className="profile-stats">
                        <span>📖 Read: {stats.read || 0}</span>
                        <span>📚 Reading: {stats.reading || 0}</span>
                        <span>⭐ Wishlist: {stats.wishlist || 0}</span>
                    </div>
                </div>
            )}

            <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
                {["all", "read", "reading", "wishlist"].map(tab => (
                    <Button
                        key={tab}
                        variant={filter === tab ? "contained" : "outlined"}
                        onClick={() => setFilter(tab)}
                    >
                        {tab.toUpperCase()}
                    </Button>
                ))}
            </Stack>

            <div className="profile-grid">
                {userComics.map(entry => (
                    <Link
                        key={entry.id}
                        to={`/comics/our-stack/${entry.comic.slug}`}
                        className="profile-comic-card"
                    >
                        <img
                            src={entry.comic.cover_image}
                            alt={entry.comic.title}
                        />
                        <div className="profile-comic-info">
                            <h4>{entry.comic.title}</h4>
                        </div>
                    </Link>
                ))}
            </div>

            {userComics.length === 0 && (
                <p className="profile-empty">
                    No comic stacks here — build one now!
                </p>
            )}
        </div>
    );
};

export default Profile;
