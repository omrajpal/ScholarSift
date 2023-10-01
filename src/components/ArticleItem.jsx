import React from 'react';
import { Button, Link, ListItem, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

const abstractStyles = {
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    marginTop: '20px'
};

function ArticleItem({ article, onButtonClick, isLoading, preview }) {

    return (
        <ListItem>
            <div style={{ flex: 1 }}>
                <Typography variant="h6" style={{ marginBottom: '10px' }}>
                    <Link href={article.url} target="_blank" rel="noopener noreferrer" color="primary">
                        {article.title}
                    </Link>
                </Typography>
                <Typography color="textSecondary" style={{ marginBottom: '10px' }}>Published on: {article.publishedDate}</Typography>
                <Typography style={{ marginBottom: '10px' }}>Author: {article.author}</Typography>
                <Typography style={{ marginBottom: '20px' }}>Similarity Score: {article.score.toFixed(2)}</Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => onButtonClick(article.id, article.url)}
                    startIcon={<Search />}
                    fullWidth
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "See Preview"}
                </Button>
                {preview && preview.id === article.id && preview.type === 'abstract' && (
                    <div style={abstractStyles}>
                    {preview.content.split('</p>').map((paragraph, index) => {
                        if (paragraph.includes('<strong class="sub-title">')) {
                            const title = paragraph.match(/<strong class="sub-title">(.+)<\/strong>/)[1];
                            const content = paragraph.replace(/<strong class="sub-title">(.+)<\/strong>/, '');
                            return (
                                <div key={index} style={{ marginBottom: '16px' }}>
                                    <Typography variant="h6" style={{ marginBottom: '8px', color: '#555' }}>{title}</Typography>
                                    <Typography dangerouslySetInnerHTML={{ __html: content }} />
                                </div>
                            );
                        } else {
                            return <Typography key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />;
                        }
                    })}
                    </div>
                )}
            </div>
        </ListItem>
    );
}

export default ArticleItem;
