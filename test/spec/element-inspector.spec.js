describe('_isFunction', function() {
    beforeEach(function() {
        this.instance = new ElementInspector({targetSelector: 'body'});
    });
    
    it('does not detect undefined as function', function() {
        assert(this.instance._isFunction(undefined) === false);
    });

    it('does not detect arrays as function', function() {
        assert(this.instance._isFunction([1, 2, 3]) === false);
    });

    it('does not detect string as function', function() {
        assert(this.instance._isFunction('string') === false);
    });

    it('detects function as function', function() {
        assert(this.instance._isFunction(this.instance._isFunction) === true);
    });

    it('detects anonymouse function as function', function() {
        assert(this.instance._isFunction(function() {}) === true);
    });
});