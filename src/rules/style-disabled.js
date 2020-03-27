export default {
  id: 'style-disabled',
  description: 'Tag <style> tidak boleh digunakan.',
  init: function(parser, reporter) {
    var self = this;
    parser.addListener('tagstart', function(event) {
      if (event.tagName.toLowerCase() === 'style') {
        reporter.warn(
          'Tag <style> tidak boleh digunakan.',
          event.line,
          event.col,
          self,
          event.raw
        );
      }
    });
  }
};
