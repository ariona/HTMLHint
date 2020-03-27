export default {
  id: 'attr-value-not-empty',
  description: 'Semua atribut harus memiliki nilai.',
  init: function(parser, reporter) {
    var self = this;
    parser.addListener('tagstart', function(event) {
      var attrs = event.attrs,
        attr,
        col = event.col + event.tagName.length + 1;
      for (var i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i];
        if (attr.quote === '' && attr.value === '') {
          reporter.warn(
            'Atribut [ ' + attr.name + ' ] harus memiliki nilai.',
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
