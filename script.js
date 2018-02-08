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
  var inp = document.getElementById("inp");
  inp.putAtCursor = function(c, replace) {
    var pos = this.selectionStart,
        end = this.selectionEnd;

    if (replace) {
      if (pos != end) {
        return;
      }
      pos -= 1;
    }

    this.value = this.value.slice(0, pos) + c + this.value.slice(end);
    this.setSelectionRange(pos+1, pos+1);
  }

  inp.onkeydown = function(evt) {
      if (evt.altKey) {
        var k = evt.key;
        if (k in letters) {
          inp.putAtCursor(letters[k], false);
          return false;
        }

        if (k in combining) {
          var prev = inp.value[inp.selectionStart - 1];
          if (prev in combining[k]) {
            inp.putAtCursor(combining[k][prev], true);
            return false;
          }
        }
      }
  };
};
