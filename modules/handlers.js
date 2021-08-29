import * as pageLoaders from "../modules/pageLoaders.js"

export function scrollToAnchor(aid){
  var aTag = $("a[name='"+ aid +"']");
  $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}

export function resizeHandler() {
  var winWidth  = window.innerWidth;
  var threshold = 992;
  var els       = document.getElementsByClassName('nav-item');
  [].forEach.call(els, function (el) {
    if (winWidth >= threshold) {
      el.removeAttribute("data-toggle");
    } else {
      el.setAttribute("data-toggle", "collapse");
    }
  })
};

export const pages = {
  projects: function() {pageLoaders.loadProjects()},
  cv: function() {pageLoaders.loadCV()},
  webdev: function() {pageLoaders.loadWebDev()}//;
};

export function hashChangeHandler() {
  var hash = location.hash.substring(1)
  if (hash === ""){
    pageLoaders.loadHome();
    $(".navbar").find(".active").removeClass("active");
    $(`#homeButton`).addClass("active");
  }
  else {
    pages[hash]();
    $(".navbar").find(".active").removeClass("active");
    $(`#${hash}Button`).addClass("active");
  }
}
