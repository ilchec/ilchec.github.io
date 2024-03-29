export function loadFile(path) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", path, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}

export function peopleJSONtoCards(path) {
  var data = loadFile(path)
  //console.log(data);
  var content = JSON.parse(data);
  var cards = '';
  var i = 0;
  for(let entry of content){
    let out = "";
    if (i == 0) {
      out += '<div class = "card-deck mb-3"><div class="card ">'
    }
    else if (i % 3 == 0) {
      out += '</div><div class = "card-deck mb-3"><div class="card">'
    }
    else {
      out += '<div class="card">';
    }
    i = i+1;
    out+='<div class="avatar-container text-center mx-auto">'
    out+='<div class="avatar mx-auto">'
    out+='<img src="'+entry.image+'" class="rounded-circle avatar-image img-responsive p-3" alt="avatar" style="height:190px; wigth:190px">'
    out+='</div>'
    out+='<h4 class="card-title text-center mt-3">'+entry.name+'<small>'+entry.role.replace(/;/g, "<br>")+'</small></h4>'
    out+='</div>'
    out+='<div class="card-body d-flex flex-column pb-1">';
    out+='<div class="card-block">'
    out+= '<div class="card-text">'
    if (entry.projects.length > 0) {
      out += '<h4 class="card-title text-center">Projects</h4><div class="text-center">'+generateProjectButtons(entry.projects)
    }
    else {
      out += '<div class="text-center">No Current Projects'
    }
    out += '</div></div></div></div><div class="card-footer">'
    out+='<a href='+entry.url+' class="btn btn-secondary float-right btn-sm">Personal Page</a></div>';
    out+='</div>';
    //out+='</div>';
    //out+='</div>';
    cards += out;
    if (cards.endsWith('<div class="row"><div class="col-sm-3"><div class="card">')) {
      cards.substring(0, cards.length - '<div class="row"><div class="col-sm-3"><div class="card">'.length);
    }
}
cards += '</div>'
return(cards)
}

export function JSONtoCards(path) {
  var data = loadFile(path)
  //console.log(data);
  var content = JSON.parse(data);
  var cards = '';
  var i = 0;
  for(let entry of content){
    let out = "";
    if (i == 0) {
      out += '<div class = "card-deck mb-3"><div class="card ">'
    }
    else if (i % 3 == 0) {
      out += '</div><div class = "card-deck mb-3"><div class="card">'
    }
    else {
      out += '<div class="card">';
    }
    i = i+1;
    out+='<a href='+entry.url+'><div class="card-img-caption"><p class="card-text">'+entry.title+'</p>'
    if (entry.contributors != undefined) {
      out += '<p class="card-text-small">Contributors: <i>'+entry.contributors+'</i></p>'
    }
    if (entry.image != undefined) {
        out += '<img class="card-img-top" src="'+entry.image+'" alt="..."></div></a>'
      }
    else {
        out += '<img class="card-img-top-not-shaded background"></div></a>'
      }
    out+='<div class="card-body d-flex flex-column pb-3">';
    if (entry.exerpt != undefined) { out+=entry.exerpt; }
    out+='<div class="cls-for-load"></div><br>';
    out+='<a href='+entry.url+' class="mt-auto btn btn-info" role="button">Open</a>';
    out+='</div>';
    out+='</div>';
    //out+='</div>';
    cards += out;
    if (cards.endsWith('<div class="row"><div class="col-sm-3"><div class="card">')) {
      cards.substring(0, cards.length - '<div class="row"><div class="col-sm-3"><div class="card">'.length);
    }
}
cards += '</div>'
return(cards)
}

export function JSONtoBibtex(entry) {
if (entry === "") {return("")}
var out = `@${entry.entryType}{${entry.entryTags.author.split(" ")[0]}${entry.entryTags.year},<br>`
for (key of Object.keys(entry.entryTags)) {
  out += `${key} = "${entry.entryTags[key]}",<br>`
}
out = out.substring(0, out.length - ',<br>'.length)
out += "<br>}"
return(out)
}

export function JSONtoCitations(data) {
if (data === "") {return("")}
var out = '<br><br><span style="font-size:18px;font-weight:bold">Publications</span><br><br><div class = "container-fluid">';
for(let entry of data){
  let biblio_reference = "";
  let biblio_buttons = "";
  if (entry.entryType === "article") {
    biblio_reference += `${entry.entryTags.author} (${entry.entryTags.year}). ${entry.entryTags.title}. <i>${entry.entryTags.journal}`
    if (typeof(entry.entryTags.volume) != 'undefined') {
      biblio_reference += `, ${entry.entryTags.volume}</i>`
    }
    else {
      biblio_reference += `</i>`
    }
    if (typeof(entry.entryTags.number) != 'undefined' & typeof(entry.entryTags.volume) != 'undefined') {
      biblio_reference += `(${entry.entryTags.number})`
    }
    else if (typeof(entry.entryTags.number) != 'undefined' & typeof(entry.entryTags.volume) === 'undefined') {
      biblio_reference += `, (${entry.entryTags.number})`
    }
    else {
      biblio_reference += ``
    }
    if (typeof(entry.entryTags.pages) != "undefined") {
      biblio_reference += `, ${entry.entryTags.pages}.`
    }
    else {
       biblio_reference += `.`
    }
  }
  else if (entry.entryType === "incollection") {
    biblio_reference += `${entry.entryTags.author} (${entry.entryTags.year}). ${entry.entryTags.title}. In: ${entry.entryTags.editor} <i>${entry.entryTags.booktitle}</i> [pp. ${entry.entryTags.pages}]. ${entry.entryTags.publisher}.`
  }
  if (typeof(entry.entryTags.abstract) != "undefined") {
    biblio_buttons += `<button type="button" class='btn project-btn mt-1 mr-1 btn-sm btn-outline-primary' data-toggle="modal" data-target="#biblioModal" data-title="${String(entry.entryTags.title)}" data-content="${String(entry.entryTags.abstract)}">Abstract</button>`
  }
  else {
    biblio_buttons += ""
  }
  if (typeof(entry.entryTags.URL) != "undefined")  {
    biblio_buttons += `<a role = 'button' class='btn project-btn mt-1 mr-1 btn-sm btn-outline-danger' href='${entry.entryTags.URL}'>Text</a>`
  }
  else {
    biblio_buttons += ""
  }
  if (typeof(entry.entryTags.doi) != "undefined")  {
    biblio_buttons += `<a role = 'button' class='btn project-btn mt-1 mr-1 btn-sm btn-outline-warning' href='${entry.entryTags.doi}'>DOI</a>`
  }
  else {
    biblio_buttons += ""
  }
  try {
    biblio_buttons += `<button type="button" class='btn project-btn mt-1 mr-1 btn-sm btn-outline-dark' data-toggle="modal" data-target="#biblioModal" data-title="${String(entry.entryTags.title)}" data-content='${String(JSONtoBibtex(entry))}'>BibTeX</button>`
  }
  catch {
    biblio_buttons += ""
  }
  //else if (entry.entryType === "inbook") {

  //}
  //else if (entry.entryType === "inproceedings") {

  //}
  //else if (entry.entryType === "book") {

  //}
  out += `<div class="row"> `
  out += `<div class="col-9">${biblio_reference}</div>`
  out += `<div class="col-3"><div class="button-container">${biblio_buttons}</div></div>`
  out += `</div><br>`
}
out += "</div>"
return(out)
}

export function JSONtoAccordion(path) {
var data = loadFile(path)
//console.log(data);
var content = JSON.parse(data);
let out = '<h1>Projects</h1><br>'
out += '<div id="accordion" class="accord-card" style="padding-top: 90px; margin-top: -90px;">'
var status_btns = {"Active" : `<button type="button" class='btn project-btn mr-1 mt-auto btn-sm btn-outline-success' style="pointer-events: none">Active</button>`,
               "Completed" : `<button type="button" class='btn project-btn mr-1 mt-auto btn-sm btn-outline-primary' style="pointer-events: none">Completed</button>`,
               "Inactive": `<button type="button" class='btn project-btn mr-1 mt-auto btn-sm btn-outline-secondary' style="pointer-events: none">Inactive</button>`}
for(let entry of content){
    let pubs_json = ""
    try {
      let pubs_bibtex = loadFile(`bibtex/${entry.short_title}.bib`)
      pubs_json = bibtexParse.toJSON(pubs_bibtex);
      //console.log(pubs_json)
    }
    catch {
      pubs_json = ""
    }
    out += `<div class="card accord-card">`
    out += `<div class="card-header accord-card" id="project-collapsible-${entry.short_title}"><div class="container-fluid">`
    out += `<div class="row"> `
    out += `<div class="col-5" style="font-size:20px;">${entry.title}</div>`
    out += `<div class="col-5">${entry.contributors}</div>`
    out += `<div class="col-1"><div class="d-flex justify-content-center">${status_btns[entry.status]}</div></div>`
    out += `<div class="col-1"><a href="#" class="a-expand" data-toggle="collapse" data-target="#${entry.short_title}" aria-expanded="false" aria-controls="${entry.short_title}"><i class="fa fa-chevron-down float-right"></i></a></div>`
    out += `</div></div>`
    out += `</div>`
    out += `<div id="${entry.short_title}" class="collapse" aria-labelledby="project-collapsible-${entry.short_title}">`
    out += `<div class="card-body accord-card"><span style="font-size:18px;font-weight:bold">About</span><br><br>${entry.description}${JSONtoCitations(pubs_json)}</div>`
    out += `</div></div>`;
  //out+='</div>';

}
out += "</div>"
return(out)
}

//export function generatePopOverWindow(project) {
//  var data = loadFile("json/projects.json");
//console.log(data);
//  var projects = JSON.parse(data);
//  let currentProjectData;
//  for (p of projects) {
//    if(p.title == project){
    //console.log(p)
//      currentProjectData = p;
//      break;
//    }
//  }
//  var popOverWindow = String(currentProjectData.exerpt);
//console.log("Project Exerpt: "+popOverWindow)
//popOverWindow += '<br><button value='+project+' class="mt-auto project-btn btn btn-info btn-sm">Learn More</button>'
//  return(popOverWindow)
//}

export function generateProjectButtons(projects) {
let colors = ["primary", "secondary", "success", "danger", "warning", "info", "dark"]
colors = colors.concat(colors)
colors = colors.concat(colors)
let buttons = ""
let i = 0
var data = loadFile("json/projects.json");
var projectsData = JSON.parse(data);
for (project of projects.split(";")) {
  console.log(project)
  //console.log(data);
  let currentProjectData;
  for (p of projectsData) {
    if(p.short_title == project){
      //console.log(p)
      currentProjectData = p;
      break;
    }
  }
  let b = `<button type="button" class='btn project-btn mr-1 mt-1 btn-sm btn-outline-${colors[currentProjectData.id]}'`
  b += `data-toggle="modal" data-target="#projectModal" data-project=${project}>${project}</button>`
  i = i+1;
  buttons += b
}
return(buttons)
}

export function loadCorpora() {
  $("#homePageJumbotron").html("");
  let corporaHTML = "<h1 style='padding-top: 90px; margin-top: -90px;' id='russianDialects'>Corpora of Russian Dialects</h1><br>" +
                    JSONtoCards("json/russianDialectalCorpora.json") +
                    "<br><h1 style='padding-top: 90px; margin-top: -90px;' id='bilingualRussian'>Corpora of Bilingual Russian Varieties</h1><br>" +
                    JSONtoCards("json/bilingualRussianCorpora.json") +
                    "<br><h1 style='padding-top: 90px; margin-top: -90px;' id='indigenousLanguages'>Corpora of Indigenous Languages of Russia</h1><br>" +
                    JSONtoCards("json/indigenousCorpora.json");
  $("#pageContent").html(corporaHTML)
}
export function loadHome() {
  $("#homePageJumbotron").load("pages/homePageJumbotron.html");
  $("#pageContent").load("pages/home.html");
}
export function loadDatabases() {
  $("#homePageJumbotron").html("");
  $("#pageContent").html("<h1>Databases</h1><br>" + JSONtoCards("json/databases.json"))
}
export function loadCV() {
  $("#homePageJumbotron").html("");
  $("#pageContent").html("<h1>CV</h1><br><iframe src='pages/CV_Chechuro_Jena 27.08.2021.pdf' width='100%' height='500px'></iframe>")
}
export function loadProjects() {
  $("#homePageJumbotron").html("");
  $("#pageContent").html(JSONtoAccordion("json/projects.json"))
}
export function loadWebDev() {
  $("#homePageJumbotron").html("");
  $("#pageContent").html(JSONtoCards("json/webdev.json"))
}
export function loadPeople() {
  $("#homePageJumbotron").html("");
  let peopleHTML = "<h1 style='padding-top: 90px; margin-top: -90px;' id='peopleSupervisors'>Supervisors</h1><br>" +
                    peopleJSONtoCards("json/peopleSupervisors.json") +
                    "<br><h1 style='padding-top: 90px; margin-top: -90px;' id='peopleResearchers'>Researchers</h1><br>"+
                    peopleJSONtoCards("json/peopleResearchers.json") +
                    "<br><h1 style='padding-top: 90px; margin-top: -90px;' id='peopleAssociate'>Associate Researchers</h1><br>"+
                    peopleJSONtoCards("json/peopleAssociate.json") +
                    "<br><h1 style='padding-top: 90px; margin-top: -90px;' id='peopleAssistants'>Research Assistants</h1><br>"  +
                    peopleJSONtoCards("json/peopleAssistants.json") +
                    "<br><h1 style='padding-top: 90px; margin-top: -90px;' id='peopleManagers'>Manager</h1><br>" +
                    peopleJSONtoCards("json/peopleManagers.json");
  $("#pageContent").html(peopleHTML)
}

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
  projects: function() {loadProjects()},
  cv: function() {loadCV()},
  webdev: function() {loadWebDev()}//;
};

export function hashChangeHandler() {
  var hash = location.hash.substring(1)
  if (hash === ""){
    loadHome();
    $(".navbar").find(".active").removeClass("active");
    $(`#homeButton`).addClass("active");
  }
  else {
    pages[hash]();
    $(".navbar").find(".active").removeClass("active");
    $(`#${hash}Button`).addClass("active");
  }
}
