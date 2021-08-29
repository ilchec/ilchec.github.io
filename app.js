import * as pageLoaders from "/modules/pageLoaders.js";
import * as handlers from "/modules/handlers.js";
import * as JSONparsers from "/modules/JSONparsers.js";


$("body").delegate(".project-btn", "click", function(){
  //$(".navbar").find(".active").removeClass("active");
  //$("#projectsButton").addClass("active");
  //$("#pageContent").load("pages/projects.html");
});
$("body").delegate(".a-expand", "click", function(){
  if ($(this).attr('aria-expanded') === "true"){
    $(this).find(".fa").removeClass("fa-chevron-up");
    $(this).find(".fa").addClass("fa-chevron-down");
  }
  else if ($(this).attr('aria-expanded') === "false"){
    $(this).find(".fa").removeClass("fa-chevron-down");
    $(this).find(".fa").addClass("fa-chevron-up");
  }
});

$(document).ready(function() {
  handlers.resizeHandler(); //run on page load to set the proper state for the screen size
  handlers.hashChangeHandler() //run on page load to ensure the proper behaviour of the 'back' button
  window.addEventListener("hashchange", handlers.hashChangeHandler);
  window.addEventListener("resize", handlers.resizeHandler);

  $('#projectModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var projectShortTitle = button.data('project') // Extract info from data-* attributes
    var d = JSONparsers.loadFile("json/projects.json");
    //console.log(data);
    var projects = JSON.parse(d);
    let currentProjectData;
    for (p of projects) {
      if(p.short_title == projectShortTitle){
        //console.log(p)
        currentProjectData = p;
        break;
      }
    }
    var modal = $(this)
    modal.find('.modal-title').text(String(currentProjectData.title))
    modal.find('.modal-body p').html(`${String(currentProjectData.exerpt)}<br><br>Contributors: <i>${String(currentProjectData.contributors)}</i>`)
    modal.find('#learnMoreModalButton').on('click', function() {
      $(".navbar").find(".active").removeClass("active");
      $("#projectsButton").addClass("active");
      $("#pageContent").html(JSONparsers.JSONtoAccordion("json/projects.json"));
      $("#projectModal").modal('hide');
      modules.scrollToAnchor(project);
    })
  })
  $(document).on('show.bs.modal', '#biblioModal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var title = button.data('title') // Extract info from data-* attributes
    var content = button.data('content') // Extract info from data-* attributes
    var modal = $(this)
    modal.find('.modal-title').text(String(title))
    modal.find('.modal-body p').html(String(content))
    })
})

  $("#homeButton").click(function(){
    pageLoaders.loadHome()
  })

  $("#projectsButton").click(function(){
    pageLoaders.loadProjects()
  })

  $("#cvButton").click(function(){
    pageLoaders.loadCV()
  })

  $("#databasesButton").click(function(){
    pageLoaders.loadDatabases()
  })

  $("#corporaButton").click(function(){
    pageLoaders.loadCorpora()
  })

  $("#peopleButton").click(function(){
    pageLoaders.loadPeople()
  })

  $("#webdevButton").click(function(){
    pageLoaders.loadWebDev()
  })

  $(".nav-item").on("click", function(){
    $(".navbar").find(".active").removeClass("active");
    $(this).addClass("active");
  })
