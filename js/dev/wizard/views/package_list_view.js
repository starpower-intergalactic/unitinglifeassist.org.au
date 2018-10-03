define([
	'marionette',
	'tpl!templates/package_list.tpl',
	'tpl!templates/package.tpl'
], function( Marionette, packageListTpl, packageTpl ){


	var ItemView = Marionette.ItemView.extend({

		template : packageTpl,

		className : 'package',

		ui : {
			removeBtn : '.package-close'
		},

		events : {
			'click @ui.removeBtn' : 'removePackage' 
		},

		removePackage : function(){
			this.trigger('remove:package', {
				action : 'remove',
				id     : this.model.get('id')
			});
			this.$el.slideUp();
		}
	});

	var CollectionView = Marionette.CompositeView.extend({

		className : 'package-list',
		template : packageListTpl,

		itemView : ItemView,
		itemViewContainer : '.package-list-wrap',

		packageCount : 0,

		ui : {
			backBtn      : '.package-list-empty .btn',
			emptyWarning : '.package-list-empty'
		},

		events : {
			'click @ui.backBtn' : 'backToOptions'
		},

		initialize : function( options ){
			this.app = options.app;
			this.on('itemview:remove:package', this.triggerRemovePackage );

			this.packageCount = this.collection.length;
		},

		triggerRemovePackage : function( childView, params ){
			// console.log('itemview event received', params );
			this.app.vent.trigger('toggle:package', params );

			this.packageCount -= 1;
			if( this.packageCount === 0 ){
				this.showWarning();
			}
		},

		showWarning : function(){
			this.ui.emptyWarning.slideDown();
		},

		backToOptions : function(){
			this.app.vent.trigger('show:step', 5 );
		}

	});

	return CollectionView;

});