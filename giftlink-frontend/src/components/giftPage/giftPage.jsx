import React, { useEffect, useState } from "react";
import "./giftPage.css";

function GiftsPage() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const res = await fetch("/api/gifts");
        if (!res.ok) {
          let errBody = null;
          try {
            errBody = await res.json();
          } catch (e) {}
          const message = errBody?.message || `Server returned ${res.status}`;
          setErrorMsg(message);
          setGifts([]);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setGifts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching gifts:", err);
        setErrorMsg("Network or server error while fetching gifts");
      } finally {
        setLoading(false);
      }
    };
    fetchGifts();
  }, []);

  if (loading) return <div className="gifts-container"><p>Loading gifts...</p></div>;

  return (
    <div className="gifts-container">
      <h1 style={{ textAlign: "center", marginBottom: "1.5rem", color: "#333" }}>
        🎁 Gift Collection
      </h1>

      {errorMsg && <p style={{ color: "red", textAlign: "center" }}>{errorMsg}</p>}

      {gifts && gifts.length > 0 ? (
        <div className="gifts-grid">
          {gifts.map((gift) => (
            <div key={gift._id || gift.id} className="gift-card">
              <img
                src={gift.image || "https://via.placeholder.com/300x200"}
                alt={gift.name}
              />
              <div className="gift-details">
                <h3>{gift.name}</h3>
                <p>{gift.description}</p>
                <div className="meta">
                  <span className="category">{gift.category}</span>
                  <span className="condition">{gift.condition}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>No gifts found.</p>
      )}
    </div>
  );
}

export default GiftsPage;
