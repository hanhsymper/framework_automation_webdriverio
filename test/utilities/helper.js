const waitForTextChange = (el, text, timeout) => {
  browser.waitUntil(
    function () {
      return el.getText() === text;
    },
    { timeout }
  );
};

const waitAndClick = (el, timeout) => {
  el.waitForDisplayed({ timeout: timeout });
  el.click();
};
module.exports = waitAndClick;
