export default {
  id: 'space-tab-mixed-disabled',
  description: 'Tidak boleh mencampur spasi dan tab untuk indentasi.',
  init: function(parser, reporter, options) {
    var self = this;
    var indentMode = 'nomix';
    var spaceLengthRequire = null;
    if (typeof options === 'string') {
      var match = options.match(/^([a-z]+)(\d+)?/);
      indentMode = match[1];
      spaceLengthRequire = match[2] && parseInt(match[2], 10);
    }
    parser.addListener('text', function(event) {
      var raw = event.raw;
      var reMixed = /(^|\r?\n)([ \t]+)/g;
      var match;
      while ((match = reMixed.exec(raw))) {
        var fixedPos = parser.fixPos(event, match.index + match[1].length);
        if (fixedPos.col !== 1) {
          continue;
        }
        var whiteSpace = match[2];
        if (indentMode === 'space') {
          if (spaceLengthRequire) {
            if (
              /^ +$/.test(whiteSpace) === false ||
              whiteSpace.length % spaceLengthRequire !== 0
            ) {
              reporter.warn(
                'Gunakan spasi untuk indentasi dan tetap gunakan ' +
                  spaceLengthRequire +
                  ' spasi.',
                fixedPos.line,
                1,
                self,
                event.raw
              );
            }
          } else {
            if (/^ +$/.test(whiteSpace) === false) {
              reporter.warn(
                'GUnakan spasi untuk indentasi.',
                fixedPos.line,
                1,
                self,
                event.raw
              );
            }
          }
        } else if (indentMode === 'tab' && /^\t+$/.test(whiteSpace) === false) {
          reporter.warn(
            'Gunakan tab untuk indentasi.',
            fixedPos.line,
            1,
            self,
            event.raw
          );
        } else if (/ +\t|\t+ /.test(whiteSpace) === true) {
          reporter.warn(
            'Jangan mencampir tab dan spasi untuk indentasi.',
            fixedPos.line,
            1,
            self,
            event.raw
          );
        }
      }
    });
  }
};
