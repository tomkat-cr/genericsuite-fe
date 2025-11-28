import React from 'react';

import {
  WAIT_ANIMATION_IMG,
  MSG_ALT_WAIT_ANIMATION,
} from '../constants/general_constants.jsx';

import {
  SHOW_HIDE_PAGE_ANIMATION_ENABLED_CLASS,
  SHOW_HIDE_PAGE_ANIMATION_DISABLED_CLASS,
  PAGE_ANIMATION_CLASS,
} from '../constants/class_name_constants.jsx';

export const WaitAnimation = () => {
  return (
    <div className={PAGE_ANIMATION_CLASS}>
      <img src={WAIT_ANIMATION_IMG} alt={MSG_ALT_WAIT_ANIMATION} />
    </div>
  );
};

export const ShowHidePageAnimation = (
  showAnimation,
  elementId = "nav_animation"
) => {
  let animationDiv = document.getElementById(elementId);
  if (animationDiv) {
    animationDiv.className = (showAnimation ?
      SHOW_HIDE_PAGE_ANIMATION_ENABLED_CLASS
      :
      SHOW_HIDE_PAGE_ANIMATION_DISABLED_CLASS);
  }
};
