import "./styles.css";

export const Loading = () => {
  return (
    <div className="semipolar-spinner">
      <div className={"ring"}></div>
      <div className={"ring"}></div>
      <div className={"ring"}></div>
      <div className={"ring"}></div>
      <div className={"ring"}></div>
    </div>
  );
};
