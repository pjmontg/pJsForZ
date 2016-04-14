// JavaScript Document

p$.med.filename = 'pipeline.mediator.js';
p$.require("pipeline.common.js", p$.med.filename);
p$.require("pipeline.exception.js", p$.med.filename);


p$.med.Mediator = function(core) {
	this.core = core;
}

p$.med.Mediator.listeners = new Array();

p$.med.Mediator.prototype.notify = function(eventType, evData) {
	for (i in p$.med.Mediator.listeners) {
		var listener = p$.med.Mediator.listeners[i];
		
		
		//TODO, unify view and content event objects
		/*for (i in evData) {
			dataObj[i] = evData[i];
		}
		dataObj['listener'] = listener.listener*/
		evData = evData || {};
		evData['listener'] = listener.listener
		
		if (listener.eventType === eventType) {
			listener.eventHandler({
				type: eventType, 
				listener: listener.listener,
				data: evData
			});
		}
	}
}


p$.med.Mediator.prototype.addContextListener = function(eventId, source, handlerid, handler) {
	var key = source.id + "|" + eventId +"|" + handlerid;
	if (handlerid === undefined) {
		throw new p$.ex.ContextListenerException("Could not add handler.  Handler ID is undefined. Key = " + key);	
	}
	
	if (source.id === undefined) {
		throw new p$.ex.ContextListenerException("Could not add handler.  Source ID is undefined. Key = " + key);	
	}

	p$.med.Mediator.listeners[key] = {
		eventType: eventId, 
		eventHandler: handler, 
		listener: source
	};
}

p$.med.Mediator.prototype.removeContextListener = function(eventId, source, handlerid) {
	var key = source.id + "|" + eventId +"|" + handlerid;
	if (handlerid === undefined) {
		throw new p$.ex.ContextListenerException("Could not remove handler.  Handler ID is undefined. Key = " + key);	
	}
	
	if (source.id === undefined) {
		throw new p$.ex.ContextListenerException("Could not remove handler.  Source ID is undefined. Key = " + key);	
	}
	
	delete p$.med.Mediator.listeners[key];
}

p$.registerFile(p$.med.filename);