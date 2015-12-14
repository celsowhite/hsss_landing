$(document).ready(function() {
  var $element = $('input[type="range"]');
  var $output = $('output');

  function updateOutput(el, val) {
    el.textContent = val;
    var numerical = parseInt(val);
    console.log('update');
    //0 - 3 | 4 - 6 | 7 - 10
    if (numerical <= 4) {
      el.textContent = 'they mean less than they say'
    } else if (numerical == 5) {
      el.textContent = 'they mean what they say';
    } else {
      el.textContent = 'they mean more than they say';
    }
  }

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