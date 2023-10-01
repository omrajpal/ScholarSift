import React from 'react';
import { Button, TextField, Typography, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';

function SearchBox({ articleUrl, onSearch, onChange, isLoading, error }) {
    return (
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '40px', backgroundColor: '#ffffff' }}>
            <Typography
                sx={{
                    background: "linear-gradient(to right, #2E3192, #1BFFFF)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    fontSize: '70px',
                    fontWeight: 'bold',
                }}
            >
                ScholarSift
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                fullWidth
                variant="outlined"
                label="Paste the article URL"
                value={articleUrl}
                onChange={onChange}
                style={{ marginBottom: '20px' }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={onSearch}
                startIcon={<Search />}
                fullWidth
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "Find Similar Articles"}
            </Button>
        </Paper>
    );
}

export default SearchBox;
