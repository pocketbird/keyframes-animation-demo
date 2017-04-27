var stateCheck = setInterval(function() {
  if (document.readyState === 'complete') {
    clearInterval(stateCheck);

    // document ready
    console.log('dom is ready!');

    animateArticles('.js-article');
  }
}, 100);

function animateArticles(selector) {
  this.articles = document.querySelectorAll(selector);

  for (i = 0; i < articles.length; i++) {
    new topAndBottom(articles[i], '.js-top', '.js-bottom');
  }
}

function topAndBottom(article, topSelector, bottomSelector) {
  this.top = article.querySelectorAll(topSelector)[0];
  this.bottom = article.querySelectorAll(bottomSelector)[0];

  handleClick(this.top, this.bottom);
}

function handleClick(top, bottom) {
  top.addEventListener('click', function() {
    if (top.classList.contains('move')) {
      top.classList.remove('move');
      bottom.classList.remove('move');
    } else{
      top.classList.add('move');
      bottom.classList.add('move');
    }
  });

  bottom.addEventListener('click', function() {
    if (top.classList.contains('move')) {
      top.classList.remove('move');
      bottom.classList.remove('move');
    }
  });
}
