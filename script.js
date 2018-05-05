var letters = {
  "A": "Æ", "a": "æ",
  "D": "Ð", "d": "ð",
  "T": "Þ", "t": "þ",
  "W": "Ƿ", "w": "ƿ",
  "e": "⁊",
};

var combining = {
  "-": {
    "A": "Ā", "a": "ā",
    "E": "Ē", "e": "ē",
    "I": "Ī", "i": "ī",
    "O": "Ō", "o": "ō",
    "U": "Ū", "u": "ū",
    "Y": "Ȳ", "y": "ȳ",
    "Æ": "Ǣ", "æ": "ǣ",
  },
  "'": {
    "A": "Á", "a": "á",
    "E": "É", "e": "é",
    "I": "Í", "i": "í",
    "O": "Ó", "o": "ó",
    "U": "Ú", "u": "ú",
    "Y": "Ý", "y": "ý",
    "Æ": "Ǽ", "æ": "ǽ",
  },
  ".": {
    "G": "Ġ", "g": "ġ",
    "C": "Ċ", "c": "ċ",
  },
};

var insular = [
  ["D", "Ꝺ"], ["d", "ꝺ"],
  ["F", "Ꝼ"], ["f", "ꝼ"],
  ["G", "Ᵹ"], ["g", "ᵹ"],
  ["S", "Ꞅ"], ["s", "ꞅ"],
  ["R", "Ꞃ"], ["r", "ꞃ"],
  ["T", "Ꞇ"], ["t", "ꞇ"],
  ["W", "Ƿ"], ["w", "ƿ"],
  ["i", "ı"],
];

window.onload = function () {
  var inp = document.getElementById("inp"),
    status = document.getElementById("status");

  if (window.localStorage.text) {
    inp.value = window.localStorage.text;
  }

  var tout = null;

  inp.onkeydown = function (evt) {
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
    } else if (!evt.ctrlKey && !evt.metaKey) {
      if (evt.key == "e" || evt.key == "E") {
        var c = { "A": "Æ", "a": "æ" }[getPrev()];
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
    inp.setSelectionRange(pos + 1, pos + 1);
  }

  function getPrev() {
    return inp.value[inp.selectionStart - 1];
  }
};

function saveText() {
  window.localStorage.text = inp.value;
}

function insularize(mode) {
  var t = inp.value;
  for (var i = 0; i < insular.length; i++) {
    var p = insular[i];
    t = t.replace(new RegExp(p[mode], "g"), p[1 - mode]);
  }
  inp.value = t;
  saveText();
}

function removeDiacritics() {
  if (!confirm("Really remove diacritics? (This can't be undone)")) {
    return;
  }

  var combinv = {};
  for (var k in combining) {
    for (var l in combining[k]) {
      combinv[combining[k][l]] = l;
    }
  }

  var t = inp.value;
  for (var k in combinv) {
    t = t.replace(new RegExp(k, "g"), combinv[k]);
  }
  inp.value = t;
  saveText();
}
