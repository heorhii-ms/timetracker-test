import React from "react";

import "../src/Theme/global.scss";

import { GraphqlProvider } from "~/Services/graphql/GraphqlProvider";
import { MainPage } from "~/Containers/MainPage";

function App() {

  return (
    <GraphqlProvider>
      <MainPage />
    </GraphqlProvider>

  );
}

export default App;
