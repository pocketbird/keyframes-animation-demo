// Animate two elements, one that overlaps the other
//
// Make it an actual plugin:
// - bottom element origin
// - bottom element height
// - bottom element destination
// - top element origin
// - top element height
// - top element destination

function animateArticles(containerSelector, topSelector, bottomSelector, topMovementUp, bottomMovementDown, transitionSpeed) {
  addAnimationStyles(topSelector, bottomSelector, topMovementUp, bottomMovementDown, transitionSpeed);

  this.articles = document.querySelectorAll(containerSelector);

  for (i = 0; i < articles.length; i++) {
    new topAndBottom(articles[i], topSelector, bottomSelector);
  }
}

function addAnimationStyles(topSelector, bottomSelector, topMovementUp, bottomMovementDown, transitionSpeed) {
  // Create CSS selector styles
  var style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = topSelector + ' { -webkit-transform: translate(0, 0); -webkit-transition: -webkit-transform ' + transitionSpeed + '; transform: translate(0, 0); transition: all ' + transitionSpeed + '; } ' + topSelector + '.moved { -webkit-transform: translate(0px, -' + topMovementUp + '); transform: translate(0px, -' + topMovementUp + '); } ' + bottomSelector + ' { -webkit-transform: translate(0, 0); -webkit-transition: -webkit-transform ' + transitionSpeed + '; transform: translate(0, 0); transition: all ' + transitionSpeed + '; }' + bottomSelector + '.moved { -webkit-transform: translate(0px, ' + bottomMovementDown + '); transform: translate(0px, ' + bottomMovementDown + '); }';
  document.getElementsByTagName('head')[0].appendChild(style);
}

function topAndBottom(article, topSelector, bottomSelector) {
  this.top = article.querySelectorAll(topSelector)[0];
  this.bottom = article.querySelectorAll(bottomSelector)[0];

  handleClick(this.top, this.bottom);
}

function handleClick(top, bottom) {
  top.onchange = function (e) {
    var selectedOption = this[this.selectedIndex];
    var selectedText = selectedOption.text;

    if (selectedText !== 'Select an appointment') {
      console.log('selection');
      if (!top.classList.contains('moved')) {
        top.classList.add('moved');
        bottom.classList.add('moved');
      }
    } else {
      console.log('no selection');
      top.classList.remove('moved');
      bottom.classList.remove('moved');
    }
  }
}
