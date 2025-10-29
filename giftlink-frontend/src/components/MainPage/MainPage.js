import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import urlConfig from "../data/urlConfig";
import "../static/MainPage.css"; // optional, if you’ll style it

const MainPage = () => {
  const [gifts, setGifts] = useState([]);
  const navigate = useNavigate();

  // Fetch all gifts (Task 1)
  useEffect(() => {
    const fetchGifts = async () => {
      try {
        let url = `${urlConfig.backendUrl}/api/gifts`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        setGifts(data);
      } catch (error) {
        console.log("Fetch error: " + error.message);
      }
    };
    fetchGifts();
  }, []);

  // Format timestamp (Task 3)
  const formatDate = (timestamp) => {
    if (!timestamp) return "No Date";
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("default", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Navigate to gift details page (Task 2)
  const handleGiftClick = (productId) => {
    navigate(`/app/product/${productId}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Available Gifts</h2>
      <div className="row">
        {gifts.length === 0 ? (
          <p className="text-center">No gifts available.</p>
        ) : (
          gifts.map((gift) => (
            <div className="col-md-4 mb-4" key={gift._id}>
              <div
                className="card h-100 shadow-sm"
                onClick={() => handleGiftClick(gift._id)}
                style={{ cursor: "pointer" }}
              >
                {/* Task 4: Image or placeholder */}
                <div className="image-placeholder">
                  {gift.image ? (
                    <img
                      src={gift.image}
                      alt={gift.name}
                      className="card-img-top"
                    />
                  ) : (
                    <div className="no-image-available text-center p-5 text-muted">
                      No Image Available
                    </div>
                  )}
                </div>

                <div className="card-body text-center">
                  {/* Task 5: Gift name */}
                  <h5 className="card-title">{gift.name}</h5>

                  {/* Task 6: Formatted date */}
                  <p className="card-text text-secondary">
                    {formatDate(gift.date_added)}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MainPage;
