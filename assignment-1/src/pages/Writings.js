import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

function Writings() {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Load saved entries from localStorage
    const savedEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    setEntries(savedEntries);
  }, []);

  const saveEntry = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    let updatedEntries;
    if (editingId !== null) {
      // Update existing entry
      updatedEntries = entries.map(entry =>
        entry.id === editingId
          ? { ...entry, title, content, lastModified: new Date().toISOString() }
          : entry
      );
    } else {
      // Create new entry
      const newEntry = {
        id: Date.now(),
        title,
        content,
        createdAt: new Date().toISOString(),
        lastModified: new Date().toISOString()
      };
      updatedEntries = [...entries, newEntry];
    }

    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    
    // Reset form
    setTitle('');
    setContent('');
    setEditingId(null);
  };

  const editEntry = (entry) => {
    setTitle(entry.title);
    setContent(entry.content);
    setEditingId(entry.id);
    window.scrollTo(0, 0);
  };

  const deleteEntry = (id) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Journal Entries</h1>
        <p className="text-gray-600">
          Write about your thoughts, experiences, and reflections on mental health
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <form onSubmit={saveEntry}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Enter a title for your entry"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="6"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="Write your thoughts here..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {editingId !== null ? 'Update Entry' : 'Save Entry'}
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {entries.map(entry => (
          <div key={entry.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{entry.title}</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => editEntry(entry)}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-gray-600 whitespace-pre-wrap mb-4">{entry.content}</p>
            <div className="text-sm text-gray-500">
              Created on {format(new Date(entry.createdAt), 'MMM d, yyyy')}
              {entry.lastModified !== entry.createdAt && 
                ` • Last modified on ${format(new Date(entry.lastModified), 'MMM d, yyyy')}`}
            </div>
          </div>
        ))}

        {entries.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No entries yet. Start writing your first entry above!
          </div>
        )}
      </div>
    </div>
  );
}

export default Writings; 