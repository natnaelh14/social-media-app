import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import App from "./app/App.jsx";
import "./index.css";

export const client = new ApolloClient({
  link: createHttpLink({
    uri: `${import.meta.env.REACT_APP_BASE_URL}/graphql`,
  }),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const root = createRoot(document.getElementById("root")!);
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);
