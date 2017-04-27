var stateCheck = setInterval(function() {
  if (document.readyState === 'complete') {
    clearInterval(stateCheck);

    // document ready
    console.log('dom is ready!');

    animateArticles('.js-container', '.js-top', '.js-bottom', '20px', '80px', '500ms');
  }
}, 100);
