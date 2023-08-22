import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./components/StarRating";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* <StarRating maxRating={5} />
    <StarRating
      maxRating={5}
      color="red"
      size={30}
      className="test"
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={3}
    /> */}
    <App />
  </>
);
