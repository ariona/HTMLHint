export default {
  id: 'attr-no-duplication',
  description: 'Elemen tidak boleh memiliki atribut ganda.',
  init: function(parser, reporter) {
    var self = this;
    parser.addListener('tagstart', function(event) {
      var attrs = event.attrs;
      var attr;
      var attrName;
      var col = event.col + event.tagName.length + 1;

      var mapAttrName = {};
      for (var i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i];
        attrName = attr.name;
        if (mapAttrName[attrName] === true) {
          reporter.error(
            'Telah ditemukan nama atribut ganda dari [ ' + attr.name + ' ]',
            event.line,
            col + attr.index,
            self,
            attr.raw
          );
        }
        mapAttrName[attrName] = true;
      }
    });
  }
};
