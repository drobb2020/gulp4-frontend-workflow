// Youtube tutorial here: https://youtu.be/LDgPTw6tePk

// These functions are designed to be exported, but you could create a class instead. See tutorial video.

// #1 proper case
export const properCase = (string) => {
  return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
};

// #2 console log
export const log = (content) => {
  console.log(content);
};

// #3 query selector with optional scope
export const select = (selector, scope) => {
  return (scope || document).querySelector(selector);
};

// #4 addEventListener wrapper
export const listen = (target, event, callback, capture = false) => {
  target.addEventListener(event, callback, !!capture);
};

// #5 sanitize input / escape characters
export const sanitizeInput = (inputValue) => {
  const div = document.createElement("div");
  div.textContent = inputValue;
  return div.innerHTML;
};

// #6 create an element with an optional CSS class
export const createElement = (tag, className) => {
  const el = document.createElement(tag);
  if (className) el.classList.add(className);
  return el;
};

// #7 delete all contents
export const deleteChildElements = (parentElement) => {
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};

// #8 add class with optional query scope
export const addClass = (selector, className, scope) => {
  (scope || document).querySelector(selector).classList.add(className);
};

// #9 check for iOS
export const isIOS = () => {
  return (
    (/iPad|iPhone|iPod/.test(navigator.platform) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
    !window.MSStream //MSStream is to avoid IE11
  );
};

// #10 get parameters by name from url
export const getParameterValue = (paramName, url) => {
  if (!url) url = window.location.href;
  const regex = new RegExp(`[?&]${paramName}(=([^&#]*))`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};
