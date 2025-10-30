import React, { useEffect, useState } from "react";
import "./giftPage.css";


function GiftsPage() {
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const res = await fetch("/api/gifts");
        // console.log("Fetched gifts:", data);
        const data = await res.json();
        setGifts(data);
      } catch (err) {
        console.error("Error fetching gifts:", err);
      }
    };
    fetchGifts();
  }, []);

  return (
    <div className="gifts-container">
        <p>Fetched data: {JSON.stringify(gifts)}</p>
      {gifts.length > 0 ? (
        <div className="gifts-grid">
          {gifts.map((gift) => (
            <div key={gift._id} className="gift-card">
              <img src={gift.image} alt={gift.name} />
              <h3>{gift.name}</h3>
              <p>{gift.description}</p>
              <span className="category">{gift.category}</span>
              <span className="condition">{gift.condition}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No gifts found.</p>
      )}
    </div>
  );
}

export default GiftsPage;
