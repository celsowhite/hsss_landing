$(document).ready(function() {
  var $element = $('input[type="range"]');
  var $output = $('output');

  var meaningSlider = new Tracker('meaning_slider', 5);

  function updateOutput(el, val) {
    el.textContent = val;
    var numerical = parseInt(val);
    meaningSlider.updateData(numerical);
    //0 - 3 | 4 - 6 | 7 - 10
    if (numerical <= 4) {
      el.textContent = 'They mean less than they say.'
    } else if (numerical == 5) {
      el.textContent = 'They mean what they say.';
    } else {
      el.textContent = 'They mean more than they say.';
    }
  }

  $('.slider_send').click(function(e) {
    meaningSlider.sendData();
  });

  $element.rangeslider({
    polyfill: false,
    onInit  : function () {
      updateOutput($output[0], this.value);
    }
  })
  .on('input', function () {
    updateOutput($output[0], this.value);
  });
});