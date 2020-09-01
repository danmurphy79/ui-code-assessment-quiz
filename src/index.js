import React from "react";
import ReactDOM from "react-dom";
import { App } from "./client/App";
import {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client";

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

//TODO: remove this sample code
client
  .query({
    query: gql`
      {
        questions {
          question
          type
          correct_answer
          incorrect_answers
        }
      }
    `,
  })
  .then((result) => console.log(result));

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
