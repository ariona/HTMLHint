export default {
  id: 'doctype-html5',
  description: 'Doctype tidak valid. Gunakan: "<!DOCTYPE html>"',
  init: function(parser, reporter) {
    var self = this;
    function onComment(event) {
      if (
        event.long === false &&
        event.content.toLowerCase() !== 'doctype html'
      ) {
        reporter.warn(
          'Doctype tidak valid. Gunakan: "<!DOCTYPE html>"',
          event.line,
          event.col,
          self,
          event.raw
        );
      }
    }
    function onTagStart() {
      parser.removeListener('comment', onComment);
      parser.removeListener('tagstart', onTagStart);
    }
    parser.addListener('all', onComment);
    parser.addListener('tagstart', onTagStart);
  }
};
