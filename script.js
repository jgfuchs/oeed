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

  var tout = null;

  inp.onkeydown = function(evt) {
    if (tout) {
      clearTimeout(tout);
    }
    tout = setTimeout(saveText, 250);

    if (evt.altKey) {
      var k = evt.key;
      if (k in letters) {
        putAtCursor(letters[k], false);
        return false;
      }

      if (k in combining) {
        var prev = inp.value[inp.selectionStart - 1];
        if (prev in combining[k]) {
          putAtCursor(combining[k][prev], true);
          return false;
        }
      }
    }
  };

  function saveText() {
    window.localStorage.text = inp.value;
  }
};
