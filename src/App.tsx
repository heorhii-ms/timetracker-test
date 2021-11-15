import React from "react";
import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import "./App.css";

import { GetTasks } from "./Components/GetTasks";

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    graphQLErrors.map(({message}) => {
      alert(`Graphql error:${message}`);
    });
  }
});
const link = from([
  errorLink,
  new HttpLink({
    uri: "https://graph.proworkflow.com/DEVTESTheorhii",
    headers: {
      "Authorization": "9C3T-BTCN-U7T6-F52K-PWFPYCH-TR115519"
    }
  })
]);


function App() {
  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <GetTasks />
    </ApolloProvider>
  );
}

export default App;
