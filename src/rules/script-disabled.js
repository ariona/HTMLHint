export default {
  id: 'script-disabled',
  description: 'Tag <script> tidak boleh digunakan.',
  init: function(parser, reporter) {
    'use strict';

    var self = this;

    parser.addListener('tagstart', function(event) {
      if (event.tagName.toLowerCase() === 'script') {
        reporter.error(
          'Tag <script> tidak boleh digunakan.',
          event.line,
          event.col,
          self,
          event.raw
        );
      }
    });
  }
};
