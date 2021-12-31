import { render, screen } from "@testing-library/react";
import AddPost from "../components/AddPost/add-post.component";
import { Provider } from "react-redux";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { store } from "../redux/store.ts";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:3001/graphql",
});

test("on initial render, the post button is disabled", () => {
  render(
    <ApolloProvider client={client}>
    <Provider store={store}>
      <AddPost refetchPosts={() => console.log("refresh")} />
    </Provider>
    </ApolloProvider>
  );
  screen.debug();
});
