const showLetters = document.getElementById('letters');
const showChars = document.getElementById('chars');
const sourceText = document.getElementById('source-text');
const outputText = document.getElementById('output-text');
const downloadButton = document.getElementById('download-button');
const transliterationFile = document.getElementById('transliteration-file-frame');
const transliterationRules = document.getElementById('transliteration-rules');
const transliterationButton = document.getElementById('transliteration-button');
const sortButton = document.getElementById('sort-button');
const getLinesButton = document.getElementById('getLines-button');

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
}

function stringify(obj_arr) {
  let entries = []
  for (obj of obj_arr) {
    for (pair of Object.entries(obj)) {
      entries.push(pair);
    }
  }
  let sorted = entries.sort((a, b) => b[1] - a[1]);
  let output = '';
  for (let i of sorted) {
    output = output + i[0] + "\t " + i[1] + "\n";
  }
  output = output.replace(/\n\n/g,'\n')
  return output.trim()
}

function get_letters(text, regexSource) {
  let regex = new RegExp(regexSource, "g");
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

function transliterate(text, mapping){
  let output = text;
  for (i of mapping) {
    output = output.replaceAll(i[0], i[1]);
  }
  return output
}

function readMapping(mappingSource) {
  let mapping = {};
  let sep = getDelimiters(mappingSource, ['\t', ';', ',', '>'])[0]
  for (item of mappingSource.split("\n")) {
    if (item.includes(sep)) {
      mapping[item.split(sep)[0]] = item.split(sep)[1].trim();
    }
  }
  return mapping
}

function nGram(n) {
  if (typeof n !== 'number' || isNaN(n) || n < 1 || n === Infinity) {
    throw new Error('`' + n + '` is not a valid argument for n-gram')
  }

  return grams

  // Create n-grams from a given value.
  function grams(value) {
    var nGrams = {}
    var index

    if (value === null || value === undefined) {
      return nGrams
    }

    value = value.slice ? value : String(value)
    index = value.length - n + 1

    if (index < 1) {
      return nGrams
    }

    while (index--) {
      if (!nGrams[value.slice(index, index + n)] && !/[\n\b\r\x\t  \-]/.test(value.slice(index, index + n))) {
        nGrams[value.slice(index, index + n)] = 1
      }
      else if (!/[\n\b\r\x\t  \-]/.test(value.slice(index, index + n))) {
        nGrams[value.slice(index, index + n)]++
      }
      else {
        continue
      }
    }
    return nGrams
  }
}

function repeatnGram(start, end, string) {
  let res = []
  for (let i = start; i <= end; i++) {
    res.push(nGram(i)(string))
  }
  return(res)
}

function getDelimiters (text, possibleDelimiters) {
    return possibleDelimiters.filter(weedOut);
    function weedOut (delimiter) {
        var cache = -1;
        return text.split('\n').every(checkLength);

        function checkLength (line) {
            if (!line) {
                return true;
            }

            var length = line.split(delimiter).length;
            if (cache < 0) {
                cache = length;
            }
            return cache === length && length > 1;
        }
    }
}

function getLinesContainingChars(text, chars) {
  let output = ""
  let res = {}
  for (char of chars.split("\n")) {
    //console.log(char)
    for (line of text.split("\n")) {
      if (line.includes(char) && !(line in res)) {
        res[line] = char;
      }
      else if (line.includes(char) && (line in res)) {
        if (!res[line].includes(char)) {
          res[line] += ", " + char;
        }
      }
      //else if (!(line.includes(char)) && !(line in res)) {
      //  res[line] = "";
      //}
      else {
        continue
      }
    }
  }
  for (item in res) {
    output = output + item + "\t" + res[item] +  "\n";
  }
  console.log(output)
  return output
}

if (window.FileList && window.File && window.FileReader) {
  document.getElementById('file-selector').addEventListener('change', event => {
    //output.innerHTML = '';
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', event => {
      sourceText.value = event.target.result;
    });
    reader.readAsText(file);
  });
  document.getElementById('transliteration-file').addEventListener('change', event => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', event => {
    transliterationRules.value = event.target.result;
  });
  reader.readAsText(file);
  });
}

showChars.onclick = function() {
  start = parseInt($("#nGramStartNumber").val());
  end = parseInt($("#nGramEndNumber").val());
  if (typeof start !== 'number' || isNaN(start) || start < 1 || start === Infinity) {
    alert(new Error(`This is not a valid argument for n-gram.`))
  }
  if (typeof end !== 'number' || isNaN(end) || end < 1 || end === Infinity) {
    alert(new Error(`This is not a valid argument for n-gram.`))
  }
  else if (end < start) {
    alert(new Error('Start number cannot be greater than End number.'))
  }
  outputText.value = stringify(repeatnGram(start, end, sourceText.value));
  //console.log(nGram(parseInt($("#nGramNumber").val()))(sourceText.value))
  //download("characters.tsv",count_chars(sourceText.value));
};

showLetters.onclick = function() {
  outputText.value = get_letters(sourceText.value, $("#regexpSource").val());
  //download("letters.tsv",get_letters(sourceText.value));
};

downloadButton.onclick = function() {
  download("output.tsv",outputText.value);
};

sortButton.onclick = function() {
  let mapping = readMapping($("#transliteration-rules").val());
  //console.log(mapping)
  let mappingSorted = Object.entries(mapping);
  mappingSorted = mappingSorted.sort((a, b) => b[0].length - a[0].length)
  transliterationRules.value = mappingSorted.join("\n").replaceAll(",", "\t");
}

transliterationButton.onclick = function() {
  outputText.value = transliterate(sourceText.value,Object.entries(readMapping($("#transliteration-rules").val())));
};

getLinesButton.onclick = function() {
  outputText.value = getLinesContainingChars(sourceText.value,transliterationRules.value);
};
