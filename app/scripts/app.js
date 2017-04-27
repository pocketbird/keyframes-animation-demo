var stateCheck = setInterval(function() {
  if (document.readyState === 'complete') {
    clearInterval(stateCheck);

    // document ready
    console.log('dom is ready!');

    var top = document.getElementById('top'),
        bottom = document.getElementById('bottom');

    top.addEventListener('click', function() {
      console.log('top clicked.');
      top.classList.add('move');
      bottom.classList.add('move');
    });

    // bottom.addEventListener('click', function() {
      // console.log('bottom clicked.');
    // });
  }
}, 100);
