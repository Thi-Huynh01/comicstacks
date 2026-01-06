import React, { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';
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
    const [category, setCategory] = useState('')

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/forums/categories/')
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((err) => console.error(err));
    }, []);
    console.log(categories)
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
                    onChange={handleChange}
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
                    label="What's on your mind?"
                    multiline
                    rows={15}
                />
            </Box>
            <Button variant="contained" size="large" sx={{ m: 2 }}>Create Thread</Button>
        </div>
    )

}

export default ThreadCreation