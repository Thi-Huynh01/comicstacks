import React, { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './ThreadCreation.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ThreadCreation = () => {

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const token = localStorage.getItem("access");
    const nav = useNavigate();

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/forums/categories/')
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error(err));
    }, []);
    //console.log(category.slug);

    async function handleSubmit(e) {
        e.preventDefault();

        if(!token) {
            alert("You must be logged in to post a thread");
            return;
        }

        const res = await fetch (
            'http://127.0.0.1:8000/api/forums/threads/',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ 
                    category_id: category,
                    title: title,
                    body: body,
                }),

            }
        );
        console.log(res)
        if (res.ok) {
            //setTitle("");
            const createdThread = await res.json();
            const threadId = createdThread.id;
            const categorySlug = createdThread.category.slug;
            //setCategories([...categories, updated]);
            alert("Thread Posted");
            nav(`/community/forums/${categorySlug}/${threadId}`);
        } else {
            const errorData = await res.json();
            console.log("POST failed:", errorData);
            alert("Failed to post thread");
        }
    }
    return (
        <div className="thread-container">
            <div className="thread-header">
                <title>Create Thread</title>
                Create Your Thread Here!
            </div>
            <FormControl variant="standard"
            sx={{
                m: 3,
                minWidth: 200,
            }}>
                <InputLabel id="category-label">Topic</InputLabel>
                <Select
                    labelId="category-label"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label="Age"
                >
                <MenuItem value=""><em>None</em></MenuItem>
                {categories.map (cat => (
                    <MenuItem key={cat.id} value={cat.id}>
                        {cat.category}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 2, width: '50ch' } }}
                noValidate
                autoComplete="off"
                >
                <TextField
                    id="outlined-multiline-static"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    label="Title"
                    multiline
                    rows={1}
                />
            </Box>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 2, width: '110ch' } }}
                noValidate
                autoComplete="off"
                >
                <TextField
                    id="outlined-multiline-static"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    label="What's on your mind?"
                    multiline
                    rows={15}
                />
            </Box>
            <Button type="submit" onClick={handleSubmit} variant="contained" size="large" sx={{ m: 2 }}>Create Thread</Button>

        </div>
    )

}

export default ThreadCreation