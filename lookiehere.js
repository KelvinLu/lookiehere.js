// TODO: get user customizable CSS out of the .js file and into a .css file

var lookiehere = {
    _options: {
        // Image selection properties
        selector: 'img.lookiehere',
        attribute: 'src',
        imgSrc: function(elem) {
            return elem.getAttribute(lookiehere._options.attribute);
        },

        // Tabbing and tabbing accessories
        activateByTab: true,
        tabText: 'expand',
        tabColor: 'black',
        tabFontColor: 'white',
        tabOpacity: '0.5',

        // Modal stuff... the main stuff
        padding: '1em',
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
        var self = this;

        // Modal, tab creation
        this.createModal();

        if (this._options.activateByTab) {
            this.createTab();
        }

        // Event binding
        this.bindImages();
    },

    createTab: function() {
        if (this.tabElem) document.body.removeChild(this.tabElem);

        tabElem = document.createElement('span');
        tabElem.setAttribute('class', 'lookiehere-tab');
        tabElem.style.cssText = 'position: absolute; left: 0px; top: 0px; z-index: 2147483646; cursor: zoom-in; display: none;'
        tabElem.style.backgroundColor = this._options.tabColor;
        tabElem.style.color = this._options.tabFontColor;
        tabElem.style.opacity = this._options.tabOpacity;
        tabElem.style.padding = '0.2em';

        tabElem.innerHTML = this._options.tabText;

        tabElem.addEventListener('click', this.updateAndShowModalFromTab);

        document.body.appendChild(tabElem);
        this.tabElem = tabElem;
    },

    createModal: function() {
        if (this.container) document.body.removeChild(this.container);

        container = document.createElement('div');
        container.setAttribute('class', 'lookiehere-container');
        container.style.cssText = 'position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; opacity: 0; z-index: 2147483647; pointer-events: none;'
        container.style.setProperty('-webkit-Transition' , 'opacity ' + this._options.transition);
        container.style.transition = 'opacity ' + this._options.transition;
        document.body.appendChild(container);

        bg = document.createElement('div');
        bg.style.cssText = 'position: relative; left: 0px; top: 0px; width: 100%; height: 100%;'
        bg.style.backgroundColor = this._options.color;
        bg.style.opacity = this._options.opacity;
        container.appendChild(bg);

        imageElem = document.createElement('img');
        imageElem.style.cssText = 'position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); max-width: 100%; max-height: 100%;'
        imageElem.style.padding = this._options.padding;
        container.appendChild(imageElem);

        container.addEventListener('click', this.hideModal);

        this.container = container;
        this.imageElem = imageElem;
    },

    _images: [],

    // Called from modal container
    hideModal: function() {
        this.style.opacity = 0;
        this.style.pointerEvents = 'none';
    },

    bindImages: function() {
        this.unbindImages();

        this._images = imgElems = document.querySelectorAll(this._options.selector);

        if (this._options.activateByTab) {
            for (var i = 0; i < imgElems.length; ++i) {
                imgElems[i].addEventListener('mouseover', this.showTab);
            }
        } else {
            for (var i = 0; i < imgElems.length; ++i) {
                imgElems[i].addEventListener('click', this.updateAndShowModal);
            }
        }
    },

    bindImage: function(elem) {
        if (this._options.activateByTab) {
            elem.addEventListener('mouseover', this.showTab);
        } else {
            elem.addEventListener('click', this.updateAndShowModal);
        }
    },

    unbindImages: function() {
        if (this._options.activateByTab) {
            for (var i = 0; i < this._images.length; ++i) {
                this._images[i].removeEventListener('mouseover', this.showTab);
            }
        } else {
            for (var i = 0; i < this._images.length; ++i) {
                this._images[i].removeEventListener('click', this.updateAndShowModal);
            }
        }
    },

    unbindImage: function(elem) {
        if (this._options.activateByTab) {
            elem.removeEventListener('mouseover', this.showTab);
        } else {
            elem.removeEventListener('click', this.updateAndShowModal);
        }
    },

    showTab: function(e) {
        offsets = lookiehere.utils.getOffsets(this);
        lookiehere.tabElem.style.left = offsets.left + 'px';
        lookiehere.tabElem.style.top = offsets.top + 'px';
        lookiehere.tabElem.style.display = 'inline';

        lookiehere.tabElem.setAttribute('data-lookiehere-img-src', lookiehere._options.imgSrc(this));
    },

    // This actual event handler, called from the binded object
    updateAndShowModal: function(e) {
        lookiehere.imageElem.setAttribute('src', lookiehere._options.imgSrc(this));
        lookiehere.imageElem.addEventListener('load', callback = (function() {
            lookiehere.container.style.opacity = 1;
            lookiehere.container.style.pointerEvents = 'auto';
            lookiehere.imageElem.removeEventListener('load', callback);
        }));
    },

    // Called from tab
    updateAndShowModalFromTab: function(e) {
        lookiehere.imageElem.setAttribute('src', this.getAttribute('data-lookiehere-img-src'));
        lookiehere.imageElem.addEventListener('load', callback = (function() {
            lookiehere.container.style.opacity = 1;
            lookiehere.container.style.pointerEvents = 'auto';
            lookiehere.imageElem.removeEventListener('load', callback);
        }));
    },

    cleanUp: function() {
        this.unbindImages();
        document.body.removeChild(this.container);
        document.body.removeChild(this.tabElem);
    },

    utils: {
        getOffsets: function(elem){
            var left = 0, top = 0;
            do {
              if (!isNaN(elem.offsetLeft))
                left += elem.offsetLeft;
              if (!isNaN(elem.offsetTop))
                top += elem.offsetTop;
            } while (elem = elem.offsetParent);
            return {left: left, top: top};
        },
    },
}
