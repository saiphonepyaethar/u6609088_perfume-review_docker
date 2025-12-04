'use client';

import { useEffect, useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    name: '',
    brand: '',
    rating: 5,
    review: '',
  });
  const [loading, setLoading] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [error, setError] = useState('');

  const fetchReviews = async () => {
    try {
      setLoadingReviews(true);
      setError('');
      const res = await fetch(`${API_BASE_URL}/reviews`);
      if (!res.ok) throw new Error('Failed to fetch reviews');
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
      setError('Cannot load reviews. Please try again later.');
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          brand: form.brand,
          rating: Number(form.rating),
          review: form.review,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to create review');
      }
      setForm({ name: '', brand: '', rating: 5, review: '' });
      await fetchReviews();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to create review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: 800, margin: '40px auto', padding: 20, fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: 32, marginBottom: 10 }}>Perfume Review App</h1>
      <p style={{ marginBottom: 20 }}>
        Simple DIT312 demo: frontend → backend API → MySQL (Docker).
      </p>

      {error && (
        <div style={{ background: '#ffe5e5', padding: 10, marginBottom: 20, borderRadius: 6 }}>
          {error}
        </div>
      )}

      <section style={{ marginBottom: 30 }}>
        <h2 style={{ fontSize: 24, marginBottom: 10 }}>Add New Review</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10 }}>
          <input
            name="name"
            placeholder="Perfume Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          />
          <input
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
            required
            style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          />
          <select
            name="rating"
            value={form.rating}
            onChange={handleChange}
            style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc', width: 120 }}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} Star{n > 1 ? 's' : ''}
              </option>
            ))}
          </select>
          <textarea
            name="review"
            placeholder="Write your thoughts..."
            value={form.review}
            onChange={handleChange}
            rows={3}
            style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '8px 16px',
              borderRadius: 4,
              border: 'none',
              background: '#2563eb',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {loading ? 'Saving...' : 'Submit Review'}
          </button>
        </form>
      </section>

      <section>
        <h2 style={{ fontSize: 24, marginBottom: 10 }}>All Reviews</h2>
        {loadingReviews ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p>No reviews yet. Add one above!</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ddd', padding: 8, textAlign: 'left' }}>ID</th>
                <th style={{ borderBottom: '1px solid #ddd', padding: 8, textAlign: 'left' }}>Name</th>
                <th style={{ borderBottom: '1px solid #ddd', padding: 8, textAlign: 'left' }}>Brand</th>
                <th style={{ borderBottom: '1px solid #ddd', padding: 8, textAlign: 'left' }}>Rating</th>
                <th style={{ borderBottom: '1px solid #ddd', padding: 8, textAlign: 'left' }}>Review</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r.id}>
                  <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{r.id}</td>
                  <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{r.name}</td>
                  <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{r.brand}</td>
                  <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{r.rating}★</td>
                  <td style={{ borderBottom: '1px solid #eee', padding: 8 }}>{r.review}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}
