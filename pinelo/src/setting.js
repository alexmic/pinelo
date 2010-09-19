var Setting = Class.extend({
	name: null,
	_value: null,
	changeEvent: null, /* onchange callback */
	hidden: false,
	
	init: function(name){
		this.name = name;
	},
	
	/* jquery style getter AND setter */
	value: function(v){
		if (!arguments.length) return this._value;

		this._value = v;
		this.onchange();
		return this;
	},
	
	onchange: function(callback){
		if (!arguments.length && this.changeEvent) return this.changeEvent(this._value);
		
		this.changeEvent = callback;
		return this;
	},
	
	hide: function(){
		this.hidden = true;
	},
	
	renderInto: function(container){} // define in subclass

});

var Color = Setting.extend({
	/* source ids */
	foreground: 0,
	background: 1,
	
	source: null /* optional */
});

var Range = Setting.extend({
	min: null,
	max: null,
	_step: 1, /* default */
	
	init: function(name, min, max){
		this._super(name);
		this.min = min;
		this.max = max;
	},
	
	value: function(v){
		if (!arguments.length) return this._value;

		if (v <= this.max && v >= this.min){
			this._super(v);
		}
		return this;
	},
	
	step: function(v){
		if (!arguments.length) return this._step;
		
		this._step = v;
		return this; 
	},
	
	disable: function(){
		this.disabled = true;
	},
	
	renderInto: function(container){
		if (this.hidden) return;
		
		var value_label = $('<span>').html(this._value);
		var me = this;
		
		var slider = $('<div>').slider({
			value: this._value,
			range: 'min',
			min: this.min,
			max: this.max,
			step: this._step,
			slide: function(event,ui){
				value_label.html(ui.value);
			},
			stop: function(event, ui) {
				me.value(ui.value);
			}
		});
		 
		container.append(
			$('<div>').addClass("option").append(
				$('<span>').html(this.name + ' : ')
			).append(value_label).append(
				slider
			)
		);
		
		if (this.disabled) slider.slider("disable");
	}
});
