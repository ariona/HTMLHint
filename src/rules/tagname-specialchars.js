export default {
  id: 'tagname-specialchars',
  description: 'Semua nama elemen html harus menggunakan huruf kecil.',
  init: function(parser, reporter) {
    var self = this;
    var specialchars = /[^a-zA-Z0-9\-:_]/;
    parser.addListener('tagstart,tagend', function(event) {
      var tagName = event.tagName;
      if (specialchars.test(tagName)) {
        reporter.error(
          'Nama elemen html [ ' +
            tagName +
            ' ] mengandung karakter spesial.',
          event.line,
          event.col,
          self,
          event.raw
        );
      }
    });
  }
};
