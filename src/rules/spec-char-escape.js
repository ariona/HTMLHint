export default {
  id: 'spec-char-escape',
  description: 'Karakter spesial harus di-escape',
  init: function(parser, reporter) {
    var self = this;
    parser.addListener('text', function(event) {
      var raw = event.raw,
        reSpecChar = /[<>]/g,
        match;
      while ((match = reSpecChar.exec(raw))) {
        var fixedPos = parser.fixPos(event, match.index);
        reporter.error(
          'Karakter spesial harus di-escape: [ ' + match[0] + ' ].',
          fixedPos.line,
          fixedPos.col,
          self,
          event.raw
        );
      }
    });
  }
};
