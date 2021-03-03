import React from "react";
import { Hello } from "./components/hello";
import {Header} from './components/header';
import dodgers from './images/dodgers-game';
function App() {
  return (
    <>
      <h2>We've built a custom Webpack 5 setup</h2>
      <Hello />
      <Header/>
      <img src={dodgers} width='500px' alt='the family at a dodgers game'/>
    </>
  );
}

export default App;
