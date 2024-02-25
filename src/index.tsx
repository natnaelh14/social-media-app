import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App.jsx";
import "./bootstrap.min.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { store } from "./redux/store";
import { Provider } from "react-redux";
//Enable apollo devtools, if  production is set to false
export const client = new ApolloClient({
  //New instance of ApolloClient
  link: createHttpLink({
    uri: `${import.meta.env.REACT_APP_BASE_URL}/graphql`,
  }),
  cache: new InMemoryCache(), //New instance of InMemoryCache
  connectToDevTools: true,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
