import * as JSONparsers from "../modules/JSONparsers.js";

export function loadCorpora() {
  $("#homePageJumbotron").html("");
  let corporaHTML = "<h1 style='padding-top: 90px; margin-top: -90px;' id='russianDialects'>Corpora of Russian Dialects</h1><br>" +
                    JSONparsers.JSONtoCards("json/russianDialectalCorpora.json") +
                    "<br><h1 style='padding-top: 90px; margin-top: -90px;' id='bilingualRussian'>Corpora of Bilingual Russian Varieties</h1><br>" +
                    JSONparsers.JSONtoCards("json/bilingualRussianCorpora.json") +
                    "<br><h1 style='padding-top: 90px; margin-top: -90px;' id='indigenousLanguages'>Corpora of Indigenous Languages of Russia</h1><br>" +
                    JSONparsers.JSONtoCards("json/indigenousCorpora.json");
  $("#pageContent").html(corporaHTML)
}
export function loadHome() {
  $("#homePageJumbotron").load("pages/homePageJumbotron.html");
  $("#pageContent").load("pages/home.html");
}
export function loadDatabases() {
  $("#homePageJumbotron").html("");
  $("#pageContent").html("<h1>Databases</h1><br>" + JSONparsers.JSONtoCards("json/databases.json"))
}
export function loadCV() {
  $("#homePageJumbotron").html("");
  $("#pageContent").html("<h1>CV</h1><br><iframe src='pages/CV_Chechuro_Jena 27.08.2021.pdf' width='100%' height='500px'></iframe>")
}
export function loadProjects() {
  $("#homePageJumbotron").html("");
  $("#pageContent").html(JSONparsers.JSONtoAccordion("json/projects.json"))
}
export function loadWebDev() {
  $("#homePageJumbotron").html("");
  $("#pageContent").html(JSONparsers.JSONtoCards("json/webdev.json"))
}
export function loadPeople() {
  $("#homePageJumbotron").html("");
  let peopleHTML = "<h1 style='padding-top: 90px; margin-top: -90px;' id='peopleSupervisors'>Supervisors</h1><br>" +
                    JSONparsers.peopleJSONtoCards("json/peopleSupervisors.json") +
                    "<br><h1 style='padding-top: 90px; margin-top: -90px;' id='peopleResearchers'>Researchers</h1><br>"+
                    JSONparsers.peopleJSONtoCards("json/peopleResearchers.json") +
                    "<br><h1 style='padding-top: 90px; margin-top: -90px;' id='peopleAssociate'>Associate Researchers</h1><br>"+
                    JSONparsers.peopleJSONtoCards("json/peopleAssociate.json") +
                    "<br><h1 style='padding-top: 90px; margin-top: -90px;' id='peopleAssistants'>Research Assistants</h1><br>"  +
                    JSONparsers.peopleJSONtoCards("json/peopleAssistants.json") +
                    "<br><h1 style='padding-top: 90px; margin-top: -90px;' id='peopleManagers'>Manager</h1><br>" +
                    JSONparsers.peopleJSONtoCards("json/peopleManagers.json");
  $("#pageContent").html(peopleHTML)
}
