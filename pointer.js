$(document).ready(function() {

    $(document).mousemove(function(e) {

    pointer = $('<img>').attr({'src':'cursor.png'});

                //and append them to document
                $(document.body).append(pointer); 
                pointer.css({
                        'position':'absolute',
                        top: e.pageY +10 ,    //offsets
                        left: e.pageX +10   //offsets
                    }).fadeOut(4500);   
    });
    });