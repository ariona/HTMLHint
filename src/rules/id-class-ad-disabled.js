export default {
  id: 'id-class-ad-disabled',
  description:
    'Atribut id dan class tidak boleh menggunakan kata kunci iklan/ad, karena akan diblokir olah piranti pemblokir iklan/ad.',
  init: function(parser, reporter) {
    var self = this;
    parser.addListener('tagstart', function(event) {
      var attrs = event.attrs;
      var attr;
      var attrName;
      var col = event.col + event.tagName.length + 1;

      for (var i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i];
        attrName = attr.name;
        if (/^(id|class)$/i.test(attrName)) {
          if (/(^|[-_])ad([-_]|$)/i.test(attr.value)) {
            reporter.warn(
              'Nilai dari atribut ' +
                attrName +
                ' tidak boleh menggunakan kata kunci ad/iklan.',
              event.line,
              col + attr.index,
              self,
              attr.raw
            );
          }
        }
      }
    });
  }
};
