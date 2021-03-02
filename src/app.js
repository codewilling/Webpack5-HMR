import React from "react";
import { Hello } from "./components/hello";
import {Header} from './components/header';

function App() {
  return (
    <>
      <h2>We've built a custom Webpack 5 setup</h2>
      <Hello />
      <Header/>
    </>
  );
}

export default App;
