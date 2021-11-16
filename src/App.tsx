import React from "react";

import "./App.css";

import { GraphqlProvider } from "../src/Services/Graphql/GraphqlProvider";
import { MainPage } from "../src/Pages/MainPage";

function App() {

  return (
    <GraphqlProvider>
      <MainPage />
    </GraphqlProvider>

  );
}

export default App;
