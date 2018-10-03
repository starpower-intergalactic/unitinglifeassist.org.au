define([
    'backbone'
], function( Backbone ){

    var AnswerModel = Backbone.Model.extend({
        defaults : {
            id           : null,
            parentId     : null,
            step         : null,
            next         : null,
            answer       : '',
            breadcrumb   : '',
            selected     : false,
            empty        : false,
            isNDISOption : false
        },

        initialize : function(){
            this.typeCheckParentId();
        },

        typeCheckParentId : function(){
            var parentId = this.get('parentId');

            if( parentId === 'null' ){
                this.set('parentId', null );
            }
            else if( typeof parentId === 'string' ){
                this.set('parentId', parseInt(parentId,10) );
            }
        }
    });

    return AnswerModel;
});