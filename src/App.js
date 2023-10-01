import React, { useState } from 'react';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import ArticleList from './components/ArticleList';

function App() {
    const [articleUrl, setArticleUrl] = useState('');
    const [results, setResults] = useState([]);
    const [preview, setPreview] = useState({ type: '', content: '', id: null });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const findSimilarArticles = async () => {
      setIsLoading(true);
      setError(null);
        try {
            const response = await axios.post(`http://localhost:3001/find-similar`, { url: articleUrl });
            setResults(response.data.results);
        } catch (error) {
            console.error("Error fetching data", error);
            setError(error.message + ". Please try again later.");
        } finally {
          setIsLoading(false);
        }
    };

    const getPreview = async (articleId) => {
      setIsLoading(true);
      setError(null);
      try {
          const response = await axios.post(`http://localhost:3001/get-article-info`, { ids: articleId });
          // Assuming that the server sends back the article in the 'contents' array
          setPreview({ type: 'preview', content: response.data.contents[0], id: articleId });
      } catch (error) {
          console.error("Error fetching preview", error);
          setError(error.message + ". Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    const getAbstract = async (articleURL, articleId) => {
      setIsLoading(true);
      setError(null);
      try {
          const response = await axios.post(`http://localhost:3001/get-abstract`, { url: articleURL });
          setPreview({ type: 'abstract', content: response.data.abstract, id: articleId });
      } catch (error) {
          console.error("Error fetching preview", error);
          setError(error.message + ". Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    const handleButtonClick = (articleId, articleUrl) => {
      if (articleUrl.includes("pubmed.ncbi.nlm.nih.gov")) {
        getAbstract(articleUrl, articleId);
      } else {
        getPreview(articleId);
      }
    };

    return (
      <div className="App" style={{ padding: '40px', maxWidth: '900px', margin: 'auto', backgroundColor: '#f7f9fc', textAlign: 'center' }}>
          <SearchBox
              articleUrl={articleUrl}
              onSearch={findSimilarArticles}
              onChange={(e) => setArticleUrl(e.target.value)}
              isLoading={isLoading}
              error={error}
          />
          <ArticleList
              articles={results}
              onButtonClick={handleButtonClick}
              isLoading={isLoading}
              preview={preview}
          />
      </div>
  );
}

export default App;

