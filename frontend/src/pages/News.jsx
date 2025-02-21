import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_URL = `https://newsapi.org/v2/everything?q=(agriculture OR farming OR crops OR agribusiness OR irrigation OR agrotech) AND India&language=en&sortBy=publishedAt&apiKey=${API_KEY}`;

const News = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.articles) {
          // Filter articles to ensure they are relevant to agriculture and India
          const filteredNews = data.articles.filter(
            (article) =>
              article.title.toLowerCase().includes("agriculture") ||
              article.title.toLowerCase().includes("farming") ||
              article.title.toLowerCase().includes("crop") ||
              article.title.toLowerCase().includes("agri") ||
              article.description?.toLowerCase().includes("agriculture") ||
              article.description?.toLowerCase().includes("farming") ||
              article.description?.toLowerCase().includes("crop") ||
              article.description?.toLowerCase().includes("agri")
          );
          setNewsItems(filteredNews);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Agricultural News in India
        </h1>

        {loading ? (
          <p className="text-gray-600">Loading news...</p>
        ) : (
          <div className="grid gap-8">
            {newsItems.length > 0 ? (
              newsItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="md:flex">
                    {item.urlToImage && (
                      <div className="md:flex-shrink-0">
                        <img
                          className="h-48 w-full object-cover md:w-48"
                          src={item.urlToImage}
                          alt={item.title}
                        />
                      </div>
                    )}
                    <div className="p-8">
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(item.publishedAt).toLocaleDateString()}
                      </div>
                      <h2 className="block mt-1 text-lg leading-tight font-bold text-gray-900">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-gray-600">{item.description}</p>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 text-green-600 hover:text-green-700 font-medium block"
                      >
                        Read More →
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">
                No relevant agriculture news found.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
