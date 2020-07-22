import * as React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as fetchMock from "fetch-mock";

import HomeWork from "./HomeWork";

afterEach(cleanup);
afterEach(jest.clearAllMocks);
afterEach(() => fetchMock.restore());

describe("HomeWork", () => {
    it("サーバーから取得したメッセージが表示されること", async () => {
        fetchMock.get("/api/hello", (url, opts) => ({
            status: 200,
            body: {
                message: "Hello Mock."
            }
        }));
        const app = render(<HomeWork />);
        const heading = app.getByRole("heading");
        expect(heading).toHaveTextContent("Loading...");
        await waitFor(() => {
            expect(heading).toHaveTextContent("Hello Mock.");
        });
    });
});
