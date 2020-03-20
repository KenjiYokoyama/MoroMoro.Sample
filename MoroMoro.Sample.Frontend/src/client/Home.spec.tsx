import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Home from "./Home";

afterEach(cleanup);
afterEach(jest.clearAllMocks);

describe("HomeWork", () => {
    it("メッセージが表示されること", () => {
        const app = render(<Home />);
        const heading = app.getByRole("heading");
        expect(heading).toHaveTextContent("Hello World.");
    });
});
