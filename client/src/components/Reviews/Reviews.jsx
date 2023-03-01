import "./styles.css";
import dunkin from "../../images/dunkinDetails.jpeg"

export const Reviews = () => {
  return (
    <div className="reviews-container">
      <div className="title-container">
        <h1 id="reviews-title">Rate & Review</h1>
      </div>
      <div className="review-image-container">
        <img id="review-images" src={dunkin} alt="React Image" />
      </div>
      <div className="rating-container">
        <div class="rates">
            <input type="radio" id="star5" name="rate" value="5" />
            <label for="star5" title="text">5 stars</label>
            <input type="radio" id="star4" name="rate" value="4" />
            <label for="star4" title="text">4 stars</label>
            <input type="radio" id="star3" name="rate" value="3" />
            <label for="star3" title="text">3 stars</label>
            <input type="radio" id="star2" name="rate" value="2" />
            <label for="star2" title="text">2 stars</label>
            <input type="radio" id="star1" name="rate" value="1" />
            <label for="star1" title="text">1 star</label>
        </div>
      </div>
      <div className="lower-container">
        <h2 id="lower-review">Reviews</h2>
      </div>
      <div className="leave-review-container">
        {/* change to input */}
        <p id="review-box">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
          took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
          but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised 
          in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
          and more recently with desktop but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised 
          in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
          and more recently with desktop </p>
      </div>
      <div className="button-box">
        <button id="save">Save</button>
      </div>
    </div>
  );
};
