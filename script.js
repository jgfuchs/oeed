var letters = {
  "D": "Ð",    "d": "ð",
  "T": "Þ",    "t": "þ",
  "A": "Æ",    "a": "æ",
  "e": "⁊",
};

var combining = {
  "-": {
    "A": "Ā",    "a": "ā",
    "E": "Ē",    "e": "ē",
    "I": "Ī",    "i": "ī",
    "O": "Ō",    "o": "ō",
    "U": "Ū",    "u": "ū",
    "Y": "Ȳ",    "y": "ȳ",
    "Æ": "Ǣ",    "æ": "ǣ",
  },
  "'": {
    "A": "Á",    "a": "á",
    "E": "É",    "e": "é",
    "I": "Í",    "i": "í",
    "O": "Ó",    "o": "ó",
    "U": "Ú",    "u": "ú",
    "Y": "Ý",    "y": "ý",
    "Æ": "Ǽ",    "æ": "ǽ",
  },
  ".": {
    "G": "Ġ",    "g": "ġ",
    "C": "Ċ",    "c": "ċ",
  },
};

var insular = [
  ["W", "Ƿ"], ["w", "ƿ"],
  ["T", "Ꞇ"], ["t", "ꞇ"],
  ["D", "Ꝺ"], ["d", "ꝺ"],
  ["F", "Ꝼ"], ["f", "ꝼ"],
  ["G", "Ᵹ"], ["g", "ᵹ"],
  ["S", "Ꞅ"], ["s", "ꞅ"],
  ["R", "Ꞃ"], ["r", "ꞃ"],
];

window.onload = function() {
  var inp = document.getElementById("inp"),
      status = document.getElementById("status");

  if (window.localStorage.text) {
    inp.value = window.localStorage.text;
  }

  var tout = null;

  inp.onkeydown = function(evt) {
    if (tout) {
      clearTimeout(tout);
    }
    tout = setTimeout(saveText, 200);

    if (evt.altKey) {
      var key = evt.key;
      if (key in letters) {
        putAtCursor(letters[key], false);
        return false;
      }

      if (key in combining) {
        var prev = getPrev();
        if (prev in combining[key]) {
          putAtCursor(combining[key][prev], true);
          return false;
        }
      }
    } else if (!evt.ctrlKey && !evt.metaKey){
      if (evt.key == "e" || evt.key == "E") {
        var c = {"A": "Æ", "a": "æ"}[getPrev()];
        if (c) {
          putAtCursor(c, true);
          return false;
        }
      }
    }
  };

  function putAtCursor(c, replace) {
    var pos = inp.selectionStart,
        end = inp.selectionEnd;

    if (replace) {
      if (pos != end) {
        return;
      }
      pos -= 1;
    }

    inp.value = inp.value.slice(0, pos) + c + inp.value.slice(end);
    inp.setSelectionRange(pos+1, pos+1);
  }

  function getPrev() {
    return inp.value[inp.selectionStart-1];
  }
};

function saveText() {
  window.localStorage.text = inp.value;
}

function insularize() {
  var t = inp.value;
  for (var i = 0; i < insular.length; i++) {
    var p = insular[i];
    t = t.replace(new RegExp(p[0], "g"), p[1]);
  }
  inp.value = t;
  saveText();
}

function deinsularize() {
  var t = inp.value;
  for (var i = 0; i < insular.length; i++) {
    var p = insular[i];
    t = t.replace(new RegExp(p[1], "g"), p[0]);;
  }
  inp.value = t;
  saveText();
}
