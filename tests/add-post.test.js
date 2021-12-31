
import { render, screen } from "@testing-library/react";
import AddPost from "../src/components/AddPost/add-post.component";

test("on initial render, the post button is disabled", () => {
  render(<AddPost />)
  screen.debug()
})


