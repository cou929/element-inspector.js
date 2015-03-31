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

The target element to enable inspector. `document` element is used if not specified.

### `onMousemove`

Callback function of mousemove event. The argument of callback is event object.

### `onClick`

Callback function of click event of targetSelector element. The argument of callback is event object.

### `overlayBackgroundColor`

Background color of overlay. Default is `rgba(102, 204, 255, 0.5)` (semitransparent light blue).

## Instance methods

### `showOverlay()`

Show overlay.

### `hideOverlay()`

Hide overlay.

## Properties

### `currentTarget`

The dom node which mouse cursor points currently.

### `clicked`

The flag indicates the target elements are clicked or not.
For instance, if `clicked` is false on `onClick` event handler, this may indicate that the user selects the node.

## Test

```
npm test
```
