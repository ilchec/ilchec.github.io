function count_symbols(str) {
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
  resSorted = Object.values(res).sort(function(a,b){a > b ? -1 : 1})
  for (let i in res) {
    output = output + i + "\t " + res[i] + "\n";
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
  for (i of matches) {
    output = output + i + "\n"
  }
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
const status = document.getElementById('status');
const output = document.getElementById('output');
if (window.FileList && window.File && window.FileReader) {
  document.getElementById('file-selector').addEventListener('change', event => {
    output.innerHTML = '';
    status.innerHTML = '';
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', event => {
      txt = count_symbols(event.target.result).replace(/\n/g,'<br>')
      txt = txt.replace(/\t/g,': ')
      output.innerHTML = txt;
      download("characters.tsv",count_symbols(event.target.result));
      setTimeout(function() {
        download("letters.tsv",get_letters(event.target.result));
      }, 2000);
    });
    reader.readAsText(file);
  });
}