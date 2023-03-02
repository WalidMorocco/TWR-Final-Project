import "./styles.css"

export const AboutUs = () => {
  return (
    <div className="aboutUs-container">
        <h1 id="title">About Us</h1>
        <div className="text-box-container">
          <p id="text-box">Think of how many times you had an immense coffee craving while driving or just walking 
          around town but had no easy and centralized way of looking for the best/nearest coffee place for you. 
          Well, you can stop thinking! Introducing “CoffeeMe”, the one-stop shop for all your caffeine needs.</p>
        </div>
        <div className="button-group">
        <button id="ryan-button">Ryan</button>
        <button id="tal-button">Tal</button>
        <button id="walid-button">Walid</button>
      </div>
    </div>
    
  );
};

export default AboutUs;
