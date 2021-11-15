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
    uri: `https://graph.proworkflow.com/${process.env.REACT_APP_PRO_WORKFLOW_WORKSPACE}`,
    headers: {
      "Authorization": process.env.REACT_APP_PRO_WORKFLOW_API_KEY
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
