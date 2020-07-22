import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const homeMock = jest.fn(() => <></>);
jest.mock("./Home", () => ({ __esModule: true, default: homeMock } as any));

const homeworkMock = jest.fn(() => <></>);
jest.mock("./HomeWork", () => ({ __esModule: true, default: homeworkMock } as any));

import App from "./App";

afterEach(cleanup);
afterEach(jest.clearAllMocks);
afterAll(() => {
    jest.unmock("./Home");
    jest.unmock("./HomeWork");
});

describe("App", () => {
    it("最初に Home が表示されること", () => {
        render(<MemoryRouter><App /></MemoryRouter>);
        expect(homeMock).toBeCalled();
    });

    it("メニューから Home を表示できること", () => {
        const app = render(<MemoryRouter><App /></MemoryRouter>);
        expect(homeMock).toBeCalled();
        homeMock.mockClear();

        const menuHomeButton = app.getByText("Home", { exact: true });
        fireEvent.click(menuHomeButton);

        expect(homeMock).toBeCalled();
    });

    it("メニューから Home Work を表示できること", () => {
        const app = render(<MemoryRouter><App /></MemoryRouter>);
        expect(homeworkMock).not.toBeCalled();

        const menuHomeWorkButton = app.getByText("Home Work", { exact: true });
        fireEvent.click(menuHomeWorkButton);

        expect(homeworkMock).toBeCalled();
    });
});
