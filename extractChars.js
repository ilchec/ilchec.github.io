function count_chars(str) { // This function counts the characters in a string 
  let res = {};
  let output = "";
  for (let s of str) {
    if (!res[s] && !/^[\n\b\r ]+$/.test(s)) {
      res[s] = 1;
    }
    else if (s != "\n") {
      res[s] = res[s] + 1;
    }
    else {
      continue
    }
  }
  let entries = Object.entries(res);
  let sorted = entries.sort((a, b) => b[1] - a[1]);
  for (let i of sorted) {
    output = output + i[0] + "\t " + i[1] + "\n";
  }
  output = output.replace(/\n\n/g,'\n')
  return output.trim()
}
function get_letters(text) {
  let regex = /([а-яА-Я].*?)[а-щыэюяА-ЩЫЭЮЯ\- $]/g;
  let matches = [], found;
  let array1;
  while ((array1 = regex.exec(text)) !== null) {
    if (!(matches.includes(array1[1]))) {
      matches.push(array1[1])
    }
    regex.lastIndex--;
  }
  let output = ''
  //let entries = Object.entries(matches);
  let sorted = matches.sort((a, b) => b.length - a.length);
  for (let i of sorted) {
    output = output + i + "\t" + i.length +  "\n"
  }
  //for (i of matches) {
    //output = output + i + "\n"
  //}
  return output.trim()
}
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
const load_letters = document.getElementById('letters');
const load_chars = document.getElementById('chars');
if (window.FileList && window.File && window.FileReader) {
  document.getElementById('file-selector').addEventListener('change', event => {
    //output.innerHTML = '';
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', event => {
      txt = count_chars(event.target.result).replace(/\n/g,'<br>')
      txt = txt.replace(/\t/g,': ')
      load_letters.style.display = "block";
      load_chars.style.display = "block";
      load_chars.onclick = function() {
     	 download("characters.tsv",count_chars(event.target.result));
      };
      
      load_letters.onclick = function() {
        download("letters.tsv",get_letters(event.target.result));
    	}; 
    });
    reader.readAsText(file);
  });
}