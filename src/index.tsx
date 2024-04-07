import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import "./index.css";
import { store } from "./redux/store";

export const client = new ApolloClient({
  link: createHttpLink({
    uri: `${import.meta.env.VITE_BASE_URL}/graphql`,
  }),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const root = document.getElementById("root");
render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  root,
);
