(function($){

    $.fn.suburbSuggestions = function(){

        var apiUrl             = 'http://services.blocksglobal.com/postcodes',
            minimumQueryLength = 2,
            dataCache          = {};

        return this.each(function(){

            var $input         = $(this),
                selectId       = $input.data('state-select'),
                $select        = $input.closest('.form-row').find('select'),
                $list          = $('<ul class="suggestions" />'),
                listHidden     = true,
                data           = [],
                highlightIndex = 0,
                timeout        = null,
                delay          = 200,
                req            = null;

            console.log('START >>>');

            // START
          
            $input.after($list);
            hideList();



            // EVENTS

            $input.on('input', function(){
                // console.log('INPUT');
              
                var val = $input.val();
                clearTimeout(timeout);
                setTimeout(function(){
                    getSuggestions(val);
                }, delay);
            });
            
            $input.on('keydown', function(e){
              
              if( listHidden ){
                return;
              }
              
              if( e.keyCode === 38 ){
                // UP ARROW
                highlightUp();
              }
              else if( e.keyCode === 40 ){
                // DOWN ARROW
                highlightDown();
              }
              else if( e.keyCode === 13 ){
                // ENTER
                e.preventDefault();
                e.stopPropagation();
                setSelectedSuburb();
                $input.trigger('change');
                return false;
              }
              
            });
          
            $list.on('click', 'li', function(){
              setSelectedSuburb();
            });
          
            $list.on('mouseenter', 'li', function(){
               setHighlight($(this).index());
            });



            // METHODS
            
            function highlightUp(){
              var newIndex = highlightIndex -= 1;
              
              if( newIndex < 0 ){
                newIndex = data.length - 1;
              }
              
              setHighlight(newIndex);
            }
          
            function highlightDown(){
              var newIndex = highlightIndex + 1;
              
              if( newIndex >= data.length ){
                newIndex = 0;
              }
              
              setHighlight(newIndex);
            }
          
            function setSelectedSuburb(){
                var selectedData = data[highlightIndex],
                    suburb = downcaseSuburb(selectedData.suburb);
              
                $input.val(suburb);
                $select.val(selectedData.state).trigger('change');
              
                hideList();
            }

            function getSuggestions(query){
                query = $.trim(query.toLowerCase());
              
                if( query.length < minimumQueryLength ){
                    hideList();
                    return;
                }

                if( req ){
                  req.abort();
                }
              
                if( dataCache[query] ){
                  // console.log('Cached version found!');
                  data = dataCache[query];
                  createList();
                  return;
                }
              
              // console.log('Starting new ajax query!');

                req = $.ajax({
                    url: apiUrl,
                    data: {
                        q: query
                    },
                    dataType: 'jsonp'
                }).done(function(res){
                    // console.log('RESPONSE');
                    if( res.length > 0 ){
                      dataCache[query] = res;
                    }
                    data = res;
                    createList();
                });
            }

            function createList(){
                var html = '';

                data.forEach(function(d){
                    html += '<li>';
                        html += downcaseSuburb(d.suburb);
                        html += ' (' + d.state + ')';
                    html += '</li>';
                });
              
                $list.html(html);
                showList();

                setHighlight(0);
            }

            function setHighlight(nr){
                highlightIndex = nr;
              
                $list.children().removeClass('selected')
                .eq(highlightIndex).addClass('selected');
            }

            function hideList(){
                $list.hide();
                listHidden = true;
            }

            function showList(){
                $list.show();
                listHidden = false;
            }

            function downcaseSuburb(suburb){
                var parts    = suburb.split(' '),
                    newParts = [];
                
                parts.forEach(function(w){
                    newParts.push(w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
                });

                return newParts.join(' ');
            }
        });
    };

}(jQuery));