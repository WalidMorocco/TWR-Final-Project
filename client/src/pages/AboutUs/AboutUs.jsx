import "./styles.css"

export const AboutUs = () => {
  return (
    <div className="aboutUs-container">
        <h1 id="title">About Us</h1>
        <div className="text-box-container">
          <p id="text-box">Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer 
          took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
          but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised 
          in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
          and more recently with desktop but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised 
          in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
          and more recently with desktop   </p>
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
