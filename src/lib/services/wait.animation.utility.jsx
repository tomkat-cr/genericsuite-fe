import React from 'react';

import {
    WAIT_ANIMATION_IMG,
    MSG_ALT_WAIT_ANIMATION,
} from '../constants/general_constants.jsx';

export const WaitAnimation = () => {
    return (
      <div>
        <center>
          <img src={WAIT_ANIMATION_IMG} alt={MSG_ALT_WAIT_ANIMATION} />
        </center>
      </div>
    );
};

export const ShowHidePageAnimation = (
    showFlag,
    elementId = "NavigationAnimation"
) => {
    let animationDiv = document.getElementById(elementId);
    if (animationDiv) {
      if (showFlag) {
        animationDiv.className="ml-3 mr-3";
      } else {
        animationDiv.className="ml-3 mr-3 hidden";
      }
    }
};
