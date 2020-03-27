export default {
  id: 'attr-value-single-quotes',
  description: 'Nilai atribut harus diapit dalam tanda kutip tunggal.',
  init: function(parser, reporter) {
    var self = this;
    parser.addListener('tagstart', function(event) {
      var attrs = event.attrs,
        attr,
        col = event.col + event.tagName.length + 1;
      for (var i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i];
        if (
          (attr.value !== '' && attr.quote !== "'") ||
          (attr.value === '' && attr.quote === '"')
        ) {
          reporter.error(
            'Nilai dari atribut [ ' +
              attr.name +
              ' ] harus diapit dengan tanda kutip tunggal.',
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
