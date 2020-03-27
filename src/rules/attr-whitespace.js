export default {
  id: 'attr-whitespace',
  description:
    'Semua atribut harus dipisahkan dengan satu spasi dan tidak boleh diawali/diakhiri dengan spasi.',
  init: function(parser, reporter, options) {
    var self = this;
    var exceptions = Array.isArray(options) ? options : [];

    parser.addListener('tagstart', function(event) {
      var attrs = event.attrs,
        attr,
        col = event.col + event.tagName.length + 1;
      attrs.forEach(function(elem) {
        attr = elem;
        var attrName = elem.name;

        if (exceptions.indexOf(attrName) !== -1) {
          return;
        }

        //Check first and last characters for spaces
        if (elem.value.trim(elem.value) !== elem.value) {
          reporter.error(
            'Atribut [ ' +
              attrName +
              ' ] tidak boleh memiliki spasi diakhir',
            event.line,
            col + attr.index,
            self,
            attr.raw
          );
        }
        if (elem.value.replace(/ +(?= )/g, '') !== elem.value) {
          reporter.error(
            'Atribut [ ' +
              attrName +
              ' ] harus dipisahkan hanya dengan 1 spasi.',
            event.line,
            col + attr.index,
            self,
            attr.raw
          );
        }
      });
    });
  }
};
