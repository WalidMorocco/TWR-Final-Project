import "./details_styles.css"
import dunkin from "../../images/dunkinDetails.jpeg"
import coffee from "../../images/coffeeIcon.png"
import check from "../../images/check.png"

export const StoreDetails = () => {
  return (
    <div className="storeDetails-container">
      <img id="store-images" src={dunkin} alt="React Image" />
      <div className="detailsTitle-container">
        <h1 id="details-title">Dunkin Donuts</h1>
      </div>
      <div className="address-container">
          <a href="#" id="address">123 Main St Providence RI</a>
      </div>
      <div class="rate">
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
      <div className="drive-thru-container">
        <img id="check-image" src={check} alt="React Image" />
        <p id="drive-thru">Drive thru</p>
      </div>
      <div className="time-container">
        <p id="monday">Monday - 5 AM - 9 PM</p>
        <p id="tuesday">Tuesday - 5 AM - 9 PM</p>
        <p id="wednesday">Wednesday - 5 AM - 9 PM</p>
        <p id="thursday">Thursday - 5 AM - 9 PM</p>
        <p id="friday">Friday - 5 AM - 9 PM</p>
        <p id="saturday">Saturday - 5 AM - 9 PM</p>
        <p id="sunday">Sunday - 5 AM - 9 PM</p>
      </div>
      <div className="details-container">
        <p id="details-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
          took a galley Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
          took a galley</p>
      </div>
      <div className="button-container">
        <button id="reviews">Reviews</button>
      </div>
    </div>
  );
};
