var lookiehere = {
    _options: {
        selector: 'img.lookiehere',
        attribute: 'src',

        padding: '10em',

        color: 'black',
        opacity: '0.5',
        transition: '0.2s',
    },

    options: function(opts) {
        for (var key in opts)
            if (opts.hasOwnProperty(key))
                this._options[key] = opts[key];
    },    

    init: function(){
        // Modal creation
        this.createModal();

        // Event binding
        this.bindImages();
    },

    createModal: function() {
        if (this.container) document.body.removeChild(this.container);

        container = document.createElement('div');
        container.style.cssText = "position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; opacity: 0; z-index: 2147483647; pointer-events: none;"
        container.style.setProperty('-webkit-Transition' , "opacity " + this._options.transition); 
        container.style.transition = "opacity " + this._options.transition;
        document.body.appendChild(container);

        bg = document.createElement('div');
        bg.style.cssText = "position: relative; left: 0px; top: 0px; width: 100%; height: 100%;"
        bg.style.backgroundColor = this._options.color;
        bg.style.opacity = this._options.opacity;
        container.appendChild(bg);

        imageElem = document.createElement('img');
        imageElem.style.cssText = "position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); max-width: 100%; max-height: 100%;"
        imageElem.style.padding = this._options.padding;
        container.appendChild(imageElem);

        this.bindEvent(container, 'click', this.hideModal);

        this.container = container;
        this.imageElem = imageElem;
    },

    // Called from modal container
    hideModal: function() {
        this.style.opacity = 0;
        this.style.pointerEvents = 'none';    
    },

    bindImages: function() {
        elems = document.querySelectorAll(this._options.selector);
        for (var i = elems.length - 1; i >= 0; i--) {
            this.bindEvent(elems[i], 'click', this.imageClick);
        };
    },

    // For compatibility issues with adding event handlers
    bindEvent: function(elem, e, func) {
        if (elem.addEventListener)
            elem.addEventListener(e, func, false);
        else
            elem.attachEvent('on' + e, func);
    },

    // This actual event handler, called from the binded object
    imageClick: function(e) {
        lookiehere.imageElem.setAttribute('src', this.getAttribute(lookiehere._options.attribute));
        lookiehere.container.style.opacity = 1;
        lookiehere.container.style.pointerEvents = 'auto';
    },

    cleanUp: function() {
        document.body.removeChild(this.container);
    },
}