var stateCheck = setInterval(function() {
  if (document.readyState === 'complete') {
    clearInterval(stateCheck);

    // document ready
    console.log('dom is ready!');

    animateArticles();
  }
}, 100);

function animateArticles() {
  this.articles = document.querySelectorAll('.js-article');

  for (i = 0; i < articles.length; i++) {
    new topAndBottom(articles[i]);
  }
}

function topAndBottom(article) {
  this.top = article.querySelectorAll('.js-top')[0];
  this.bottom = article.querySelectorAll('.js-bottom')[0];

  console.log(this.top);
  console.log(this.bottom);

  new handleClick(this.top, this.bottom);
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
