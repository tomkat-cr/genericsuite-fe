import React from "react";
import renderer from 'react-test-renderer';
import { AboutBody } from "./About.jsx";

// https://jestjs.io/docs/tutorial-react
it("renders the AboutBody component with the children text", () => {
    const component = renderer.create(
        <AboutBody>
            <p>AboutBody Children text 123</p>
            <p>AboutBody Children text 456</p>
            <p>AboutBody Children text 789</p>
        </AboutBody>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
