(function(global) {
    'use strict';

    function ElementInspector(options) {
        this.doc = options.doc || document;
        if (options.targetSelector) {
            this.el = this.doc.querySelector(options.targetSelector);
        } else {
            this.el = this.doc;
        }
        this.onMousemove = options.onMousemove;
        this.onClick = options.onClick;
        this.overlayBackgroundColor = options.overlayBackgroundColor || 'rgba(102, 204, 255, 0.5)';
        this.clicked = false;
        this.overlay = null;
        this.currentTarget = null;

        this._init();
    }

    ElementInspector.prototype._init = function() {
        var that = this;

        that.appendOverlay();

        var ignore = [that.doc.body, that.doc.documentElement, that.doc];
        that.el.addEventListener('mousemove', function(e) {
            if (that.clicked) {
                return;
            }

            if (e.target === that.currentTarget) {
                return;
            }

            if (ignore.indexOf(e.target) > -1) {
                that.currentTarget = null;
                that.hideOverlay();
                return;
            }

            that.currentTarget = e.target;
           
            var offset = that._getOffset(e.target);
            var width = that._getOuterSize(e.target, 'Width');
            var height = that._getOuterSize(e.target, 'Height');

            if (that._isFunction(that.onMousemove)) {
                that.onMousemove(e);
            }

            that.setOverlayStyle(offset.top, offset.left, width, height);
            that.showOverlay();
        });
    };

    ElementInspector.prototype._isWindow = function(elem) {
        return elem !== null && elem !== undefined && elem === elem.window;  
    };

    ElementInspector.prototype._getOffset = function(elem) {
        var doc_elem = this.doc.documentElement;
        var box = {
            top: 0,
            left: 0
        };
        if (typeof elem.getBoundingClientRect !== typeof undefined) {
            box = elem.getBoundingClientRect();
        }
        var win = this._getWindow(this.doc);

        return {
            top: box.top + win.pageYOffset - doc_elem.clientTop,
            left: box.left + win.pageXOffset - doc_elem.clientLeft
        };
    };

    ElementInspector.prototype._getOuterSize = function(elem, name) {
        if (this._isWindow(elem)) {
            return elem.document.documentElement['client' + name];
        }

        if (elem.nodeType === 9) {
            var doc = elem.documentElement;
            return Math.max(
                elem.body[ "scroll" + name ], doc[ "scroll" + name ],
                elem.body[ "offset" + name ], doc[ "offset" + name ],
                doc[ "client" + name ]
            );
        }

        return elem['offset' + name];
    };

    ElementInspector.prototype._getWindow = function(elem) {
        if (this._isWindow(elem)) {
            return elem;
        } else {
            return elem.nodeType === 9 && elem.defaultView;
        }
    };

    ElementInspector.prototype._isFunction = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Function]';  
    };

    ElementInspector.prototype.showOverlay = function() {
        this.overlay.style.display = 'block';
    };

    ElementInspector.prototype.hideOverlay = function() {
        this.overlay.style.display = 'none';
    };

    ElementInspector.prototype.setOverlayStyle = function(top, left, width, height) {
        this.overlay.style.top = top + 'px';
        this.overlay.style.left = left + 'px';
        this.overlay.style.width = width + 'px';
        this.overlay.style.height = height + 'px';
    };

    ElementInspector.prototype.appendOverlay = function() {
        var overlay = this.doc.createElement('div');
        overlay.setAttribute('id', 'element-inspector-overlay');
        overlay.setAttribute('style', 'pointer-events: none; position: absolute; z-index: 1000000; background-color: ' + this.overlayBackgroundColor + ';');
        this.doc.body.appendChild(overlay);

        this.overlay = this.doc.querySelector('#element-inspector-overlay');

        var that = this;
        this.el.addEventListener('click', function(e) {
            if (that._isFunction(that.onClick)) {
                that.onClick(e);
            }
            that.clicked = !that.clicked;
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    };

    global.ElementInspector = ElementInspector;
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {});
