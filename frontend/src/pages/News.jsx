import React from "react";
import { Calendar } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "New Government Scheme for Farmers",
    date: "2024-03-15",
    category: "Policy",
    content:
      "The government has announced a new scheme to support farmers with subsidized equipment...",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU25A0p3RzB-7IQovvSS46V_VVpRZbBxff4eyvtzyGSgFetYGB4b8LB9DjulcVT9lBIYo&usqp=CAU",
  },
  {
    id: 2,
    title: "Sustainable Farming Practices",
    date: "2024-03-14",
    category: "Education",
    content:
      "Learn about the latest sustainable farming practices that can improve your yield...",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80",
  },
  // Add more news items as needed
];

const News = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Agricultural News
        </h1>

        <div className="grid gap-8">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover md:w-48"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                  <div className="uppercase tracking-wide text-sm text-green-600 font-semibold mb-1">
                    {item.category}
                  </div>
                  <h2 className="block mt-1 text-lg leading-tight font-bold text-gray-900">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-gray-600">{item.content}</p>
                  <button className="mt-4 text-green-600 hover:text-green-700 font-medium">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
