export default {
  id: 'tagname-lowercase',
  description: 'Semua elemen html harus ditulis dengan huruf kecil.',
  init: function(parser, reporter, options) {
    var self = this;
    var exceptions = Array.isArray(options) ? options : [];
    parser.addListener('tagstart,tagend', function(event) {
      var tagName = event.tagName;
      if (
        exceptions.indexOf(tagName) === -1 &&
        tagName !== tagName.toLowerCase()
      ) {
        reporter.error(
          'Nama elemen html [ ' + tagName + ' ] harus menggunakan huruf kecil.',
          event.line,
          event.col,
          self,
          event.raw
        );
      }
    });
  }
};
