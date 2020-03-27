export default {
  id: 'id-class-value',
  description:
    'Nilai dari atribut id dan class harus memenuhi aturann spesifikasi.',
  init: function(parser, reporter, options) {
    var self = this;
    var arrRules = {
        underline: {
          regId: /^[a-z\d]+(_[a-z\d]+)*$/,
          message:
            'Nilai dari atribut id dan class harus ditulis dengan huruf kecil dan dipisah dengan garis bawah (underscore).'
        },
        dash: {
          regId: /^[a-z\d]+(-[a-z\d]+)*$/,
          message:
            'Nilai dari atribut id dan class harus dutulis dengan huruf kecil dan dipisah dengan tanda pisah (dash/-).'
        },
        hump: {
          regId: /^[a-z][a-zA-Z\d]*([A-Z][a-zA-Z\d]*)*$/,
          message:
            'Nilai dari id dan atribut harus menggunakan gaya camelCase.'
        }
      },
      rule;
    if (typeof options === 'string') {
      rule = arrRules[options];
    } else {
      rule = options;
    }
    if (rule && rule.regId) {
      var regId = rule.regId,
        message = rule.message;
      if (!(regId instanceof RegExp)) {
        regId = new RegExp(regId);
      }
      parser.addListener('tagstart', function(event) {
        var attrs = event.attrs,
          attr,
          col = event.col + event.tagName.length + 1;
        for (var i = 0, l1 = attrs.length; i < l1; i++) {
          attr = attrs[i];
          if (attr.name.toLowerCase() === 'id') {
            if (regId.test(attr.value) === false) {
              reporter.warn(
                message,
                event.line,
                col + attr.index,
                self,
                attr.raw
              );
            }
          }
          if (attr.name.toLowerCase() === 'class') {
            var arrClass = attr.value.split(/\s+/g),
              classValue;
            for (var j = 0, l2 = arrClass.length; j < l2; j++) {
              classValue = arrClass[j];
              if (classValue && regId.test(classValue) === false) {
                reporter.warn(
                  message,
                  event.line,
                  col + attr.index,
                  self,
                  classValue
                );
              }
            }
          }
        }
      });
    }
  }
};
