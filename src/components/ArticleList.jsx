import React from 'react';
import { List, Paper } from '@mui/material';
import ArticleItem from './ArticleItem';

function ArticleList({ articles, onButtonClick, isLoading, preview }) {
    return (
        <List>
            {articles.map(article => (
                <Paper key={article.id} style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#ffffff' }}>
                    <ArticleItem
                        article={article}
                        onButtonClick={onButtonClick}
                        isLoading={isLoading}
                        preview={preview}
                    />
                </Paper>
            ))}
        </List>
    );
}

export default ArticleList;
