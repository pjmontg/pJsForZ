p$.ext.baseExtFilename = "pipeline.baseextensions.js";

p$.require("pipeline.common.js", p$.ext.baseExtFilename);
p$.require("jquery-1.6.4.min.js", p$.ext.baseExtFilename);


p$.ext.DomManipulation = {
	id: 'domManipulation',
	version: '1.0',
	contents: {
		append: {
			name: 'append',
			obj: function(elementId, value) {
				$("#" + elementId).append(value);	
			}
		},
		
		modifyAttribute : {
			name: 'modifyAttribute',
			obj: function(elementId, attribute, value) {
				
				//TODO make this an associative array somehow
				switch (attribute) {
					case 'background-color':
					case 'cursor':
						$("#" + elementId).css(attribute, value);
						break;
					case 'value':
						$("#" + elementId).attr(attribute, value);
						break;
					case 'hide':
						$("#" + elementId).hide();
						break;
					case 'show':
						$("#" + elementId).show();
						break;
					case 'addClass':
						$("#" + elementId).addClass(value);
						break;
					case 'removeClass':
						$("#" + elementId).removeClass(value);
						break;
					case 'html':
						p$.trace(elementId);
						$("#" + elementId).html(value);
						break;
					default:
						throw new p$.ext.ex.AttributeNotFoundException("Could not find attribute " + attribute);
				}
			}
		}
	}
}

p$.ext.ex.AttributeNotFoundException = function(message) {
		this.message = "AttributeNotFoundException: " + message;	
}

p$.inherit(p$.ext.ex.AttributeNotFoundException, p$.ex.Exception);



p$.ext.ViewEvent = {
	id: 'viewEventHandling',
	version: '1.0',
	contents: {
		bindEvent: {
			name: 'bindEvent',
			obj: function(elementId, eventType, eventHandler, eventData) {
				$("#" + elementId).bind(eventType, eventData, eventHandler);
			}
		},
		
		unbindEvent: {
			name: 'unbindEvent',
			obj: function(elementId, eventType, eventHandler) {
				$("#" + elementId).unbind(eventType, eventHandler);
			}
		}
	}
}
