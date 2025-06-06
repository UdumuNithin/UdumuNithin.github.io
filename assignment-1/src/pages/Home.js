import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Mental Health Awareness
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A safe space to share and explore writings about mental health
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          About This Platform
        </h2>
        <p className="text-gray-600 mb-6">
          This platform serves as a personal library for mental health awareness content,
          allowing you to upload and share your thoughts, experiences, and research
          in a structured and accessible way.
        </p>
        <p className="text-gray-600 mb-6">
          Whether you're documenting your journey, sharing educational resources,
          or collecting inspiring stories, this space is designed to help organize
          and preserve your valuable contributions to mental health awareness.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-primary-50 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-primary-600 mb-3">
            Upload Your Content
          </h3>
          <p className="text-gray-600 mb-4">
            Share your books, articles, and documents about mental health.
            Support formats include PDF and DOCX.
          </p>
          <Link
            to="/upload"
            className="inline-flex items-center text-primary-600 hover:text-primary-700"
          >
            Start uploading →
          </Link>
        </div>

        <div className="bg-secondary-50 rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-secondary-600 mb-3">
            Write Your Thoughts
          </h3>
          <p className="text-gray-600 mb-4">
            Create and maintain a journal of your thoughts, experiences,
            and reflections on mental health topics.
          </p>
          <Link
            to="/writings"
            className="inline-flex items-center text-secondary-600 hover:text-secondary-700"
          >
            Start writing →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home; 