import React from 'react';

import {
  MSG_ALT_WAIT_ANIMATION,
  WAIT_ANIMATION_IMG,
} from '../constants/general_constants.jsx';

import {
  WAIT_ANIMATION_CLASS,
  WAIT_ANIMATION_DISABLED_CLASS,
  WAIT_ANIMATION_ENABLED_CLASS,
} from '../constants/class_name_constants.jsx';

export const WaitAnimation = (className = "") => {
  return (
    <div className={WAIT_ANIMATION_CLASS + " " + className}>
      <img src={WAIT_ANIMATION_IMG} alt={MSG_ALT_WAIT_ANIMATION} />
    </div>
  );
};

export const ShowHideWaitAnimation = (
  showAnimation,
  elementId = "nav_animation"
) => {
  let animationDiv = document.getElementById(elementId);
  if (animationDiv) {
    animationDiv.className = (showAnimation ?
      WAIT_ANIMATION_ENABLED_CLASS
      :
      WAIT_ANIMATION_DISABLED_CLASS);
  }
};
