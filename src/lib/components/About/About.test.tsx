import React from "react";
import renderer from 'react-test-renderer';

import { UserProvider } from "../../helpers/UserContext";
import { AboutBody } from "./About.jsx";

// To avoid the snapshot mismatch "About + <Any-App-Name>" in "expect(tree).toMatchSnapshot()"
process.env.REACT_APP_APP_NAME = ""

// https://jestjs.io/docs/tutorial-react
it("renders the AboutBody component with the children text", () => {
    const component = renderer.create(
        <UserProvider>
            <AboutBody>
                <p>AboutBody Children text 123</p>
                <p>AboutBody Children text 456</p>
                <p>AboutBody Children text 789</p>
            </AboutBody>
        </UserProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
