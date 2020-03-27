export default {
  id: 'inline-style-disabled',
  description: 'Tidak boleh menggunakan style inline.',
  init: function(parser, reporter) {
    var self = this;
    parser.addListener('tagstart', function(event) {
      var attrs = event.attrs;
      var attr;
      var col = event.col + event.tagName.length + 1;
      for (var i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i];
        if (attr.name.toLowerCase() === 'style') {
          reporter.warn(
            'Style inline [ ' + attr.raw + ' ] tidak boleh digunakan.',
            event.line,
            col + attr.index,
            self,
            attr.raw
          );
        }
      }
    });
  }
};
