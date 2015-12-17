fader  = {
  setBlurBackground : function (elem) {
    this.blurBackground = elem;
  },
  getBlurBackground : function (elem) {
    return this.blurBackground
  },
  toggleElemOn : function (elem) {
    console.log('stored', elem);
    this.toggleBlurOn();
    elem.addClass('transit');
    if (elem.hasClass('no-display')) {
      elem.removeClass('no-display');
      elem.addClass('fader__active');
      setTimeout(function () {
        elem.removeClass('hidden');
        elem.removeClass('transit');
        //TIMEOUT HERE FOR CLASS REMOVAL
        //THIS SHOULD BE IN AN INIT FUNC
      }, 100);
    }
    this.prevElem = elem;
  },
  toggleElemOff : function (elem) {
    this.toggleBlurOff();
    if (!elem.hasClass('no-display')) {

      elem.removeClass('fader__active');
      elem.addClass('hidden');
      elem.addClass('transit');

      elem.one('transitionend', function (e) {
        console.log('CALLED');
        elem.addClass('no-display');
        elem.removeClass('transit');
      });
    }
  },
  toggleBlurOn : function () {
    var elem = this.getBlurBackground();
    elem.addClass('blur');
  },
  toggleBlurOff : function () {
    var elem = this.getBlurBackground();
    elem.removeClass('blur')
  },
  getPrevElem : function () {
    return this.prevElem
  },
  changeOverlay : function (elem) {
    var prevElem = this.getPrevElem();
    if (prevElem) {
      //HAVE AN OLD REFERENCE
      if (elem.selector == prevElem.selector) {
        if (!elem.hasClass('no-display')) {
          this.toggleElemOff(elem);
        } else {
          this.toggleElemOn(elem);
        }

      } else {
        this.toggleElemOn(elem);
        this.toggleElemOff(prevElem);
      }
    } else {
      this.toggleElemOn(elem);
    }
  }
};