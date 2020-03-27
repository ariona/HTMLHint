export default {
  id: 'tag-self-close',
  description: 'Tag kosong harus ditutup sendiri.',
  init: function(parser, reporter) {
    var self = this;
    var mapEmptyTags = parser.makeMap(
      'area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,track,command,source,keygen,wbr'
    ); //HTML 4.01 + HTML 5
    parser.addListener('tagstart', function(event) {
      var tagName = event.tagName.toLowerCase();
      if (mapEmptyTags[tagName] !== undefined) {
        if (!event.close) {
          reporter.warn(
            'Tag kosong : [ ' + tagName + ' ] harus ditutup sendiri.',
            event.line,
            event.col,
            self,
            event.raw
          );
        }
      }
    });
  }
};
