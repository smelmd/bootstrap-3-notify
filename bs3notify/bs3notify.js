(function($) {
 $.bs3notify = function(conf) {
  var me
   , def
   , options
   , content
   , header
   , glyphicon
   , glyphicon_color_class = ''
   , collector
   ;
  def = {
     type: ''
   , glyphicon: 'bytype'
   , title: ''
   , text: ''
   , closetime: 10000
   , position: 'bottom-right'
   , onShow: ''
   , onClose: ''
  };

  options = $.extend(def, conf);

  me = $('<div>', { 'class': 'notify-dialog ' + options.position });
  var set_glyphicon = options.glyphicon=='bytype'?true:false;

  switch(options.type){
   case 'success':
    glyphicon_color_class = 'text-success';
    if(set_glyphicon){options.glyphicon = 'glyphicon-ok-sign'}
    break;
   case 'info':
    glyphicon_color_class = 'text-info';
    if(set_glyphicon){options.glyphicon = 'glyphicon-info-sign'}
    break;
   case 'error':
    glyphicon_color_class = 'text-danger';
    if(set_glyphicon){options.glyphicon = 'glyphicon-fire'}
    break;
   case 'warning':
    glyphicon_color_class = 'text-warning';
    if(set_glyphicon){options.glyphicon = 'glyphicon-warning-sign'}
    break;
  }

  content = $('<div>', { 'class': 'notify-content' });
  header = $('<div>', { 'class': 'notify-header' });

  $('<button>', {
     'aria-hidden':'true'
   , 'data-dismiss':'modal'
   , 'class':'close'
   , 'type':'button'
   , text:'×'
   , 'click': function (e) { 
      e.preventDefault (); 
      me.fadeOut('medium', function(){
       $(this).remove(); 
       if(typeof options.onClose === 'function'){
        options.onClose();
        options.onClose = "";
       }
     });
    }
  }).appendTo(header);

  if (options.title != ''){
   $('<h5>', { 'class': 'notify-title', html: options.title }).appendTo(header);
  }
  header.appendTo(content);

  if (options.glyphicon != ''){
   $('<span>', { 'class': 'glyphicon ' + options.glyphicon + ' ' + glyphicon_color_class }).appendTo(content);
  }
  $('<div>', { 'class':'notify-body', html: options.text }).appendTo(content);
  content.appendTo(me);
  if(options.closetime > 0){
   setTimeout (function(){
    me.fadeOut('medium', function() { $(this).remove(); 
     if(typeof options.onClose === 'function'){
      options.onClose();
     }});
   }, options.closetime);
  }

  collector = $('div.notify-collector.' + options.position);
  if (0 == collector.length){
    collector = $('<div>', { 'class': 'notify-collector ' + options.position}).appendTo ('body');
  }

  if (options.position.split('-')[0] == 'top') {
   me.prependTo(collector).hide().fadeIn('slow');
  } else {
   me.appendTo(collector).hide().fadeIn('slow');
  }
  if (typeof options.onShow === 'function') { options.onShow(); }
 }
})(jQuery);