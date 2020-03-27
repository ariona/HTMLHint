export default {
  id: 'id-unique',
  description: 'Nilai dari atribut id harus unik.',
  init: function(parser, reporter) {
    var self = this;
    var mapIdCount = {};
    parser.addListener('tagstart', function(event) {
      var attrs = event.attrs,
        attr,
        id,
        col = event.col + event.tagName.length + 1;
      for (var i = 0, l = attrs.length; i < l; i++) {
        attr = attrs[i];
        if (attr.name.toLowerCase() === 'id') {
          id = attr.value;
          if (id) {
            if (mapIdCount[id] === undefined) {
              mapIdCount[id] = 1;
            } else {
              mapIdCount[id]++;
            }
            if (mapIdCount[id] > 1) {
              reporter.error(
                'Nilai id [ ' + id + ' ] harus unik.',
                event.line,
                col + attr.index,
                self,
                attr.raw
              );
            }
          }
          break;
        }
      }
    });
  }
};
