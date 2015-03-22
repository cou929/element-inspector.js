# element-inspector.js

[![Build Status](https://travis-ci.org/cou929/element-inspector.js.svg?branch=master)](https://travis-ci.org/cou929/element-inspector.js)

Inspect DOM elements like developer tools of browser

![demo](/example/demo.gif)

## Example

```js
new ElementInspector({
  // target element to enable inspector
  targetSelector: 'body'
});
```

## Constructor

### `targetSelector`

The target element to enable inspector. Required.

### `onMousemove`

Callback function of mousemove event. The argument of callback is event object.

### `onOverlayClicked`

Callback function of click event of overlay element, which indicates the dom of current mouse position. The argument of callback is event object.

### `overlayBackgroundColor`

Background color of overlay. Default is `rgba(102, 204, 255, 0.5)` (semitransparent light blue).

## Instance methods

### `showOverlay()`

Show overlay.

### `hideOverlay()`

Hide overlay.

## Test

```
npm test
```