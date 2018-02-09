var letters = {
  "D": "Ð",    "d": "ð",
  "T": "Þ",    "t": "þ",
  "W": "Ƿ",    "w": "ƿ",
  "A": "Æ",    "a": "æ",
};

var combining = {
  "-": {
    "A": "Ā",    "a": "ā",
    "E": "Ē",    "e": "ē",
    "I": "Ī",    "i": "ī",
    "O": "Ō",    "o": "ō",
    "U": "Ū",    "u": "ū",
    "Æ": "Ǣ",    "æ": "ǣ",
  },
  ".": {
    "G": "Ġ",    "g": "ġ",
    "C": "Ċ",    "c": "ċ",
  },
}

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
    tout = setTimeout(() => { window.localStorage.text = inp.value; }, 200);

    if (evt.altKey) {
      var key = evt.key;
      if (key in letters) {
        putAtCursor(letters[key], false);
        return false;
      }

      if (key in combining) {
        var prev = inp.value[inp.selectionStart - 1];
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
