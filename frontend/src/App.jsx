import "./App.css";
import Header from "./component/layout/Header/Header.jsx";
import { BrowserRouter as Router, Route , Routes} from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer.jsx";
import Home from "./component/Home/Home.jsx";
import Loader from "./component/layout/Loader/Loader";
function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>

      <Route path="/" element={<Home/>}/>
      <Route path="/test" element={<Loader/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
