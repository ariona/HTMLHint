export default {
  id: 'alt-require',
  description:
    'Tag <img> harus memiliki atribut alt dan atribut alt yang ada pada area[href] dan input[type=image] harus memiliki nilai',
  init: function(parser, reporter) {
    var self = this;
    parser.addListener('tagstart', function(event) {
      var tagName = event.tagName.toLowerCase(),
        mapAttrs = parser.getMapAttrs(event.attrs),
        col = event.col + tagName.length + 1,
        selector;
      if (tagName === 'img' && !('alt' in mapAttrs)) {
        reporter.warn(
          'Atribut alt harus ada dalam tag <img>',
          event.line,
          col,
          self,
          event.raw
        );
      } else if (
        (tagName === 'area' && 'href' in mapAttrs) ||
        (tagName === 'input' && mapAttrs['type'] === 'image')
      ) {
        if (!('alt' in mapAttrs) || mapAttrs['alt'] === '') {
          selector = tagName === 'area' ? 'area[href]' : 'input[type=image]';
          reporter.warn(
            'Atribut alt dalam ' + selector + ' harus memiliki nilai.',
            event.line,
            col,
            self,
            event.raw
          );
        }
      }
    });
  }
};
