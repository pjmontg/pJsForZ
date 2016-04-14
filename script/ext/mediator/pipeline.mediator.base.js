p$.med.baseMedFilename = "pipeline.basemediator.js";

p$.require("pipeline.common.js", p$.med.baseMedFilename);
p$.require("pipeline.exception.js", p$.med.baseMedFilename);;

p$.med.BaseMediator = function(core) {
	this.core = core;
	this.domExtDesc = {id: 'domManipulation', version: '1.0'};
	this.viewEventExtDesc = {id: 'viewEventHandling', version: '1.0'};
	this.dialogExtDesc = {id: 'dialog', version: '1.0'};
	
	this.core.requireExtension(this.domExtDesc);
	this.core.requireExtension(this.viewEventExtDesc);
	this.core.requireExtension(this.dialogExtDesc);
}


p$.inherit(p$.med.BaseMediator, p$.med.Mediator);


p$.med.BaseMediator.prototype.addViewListener = function(elementId, eventType, eventData, eventHandler ) {
	this.core.getExtension(this.viewEventExtDesc).bindEvent(elementId, eventType, eventHandler, eventData);
}

p$.med.BaseMediator.prototype.removeViewListener = function(elementId, eventType, eventHandler) { 
	this.core.getExtension(this.viewEventExtDesc).unbindEvent(elementId, eventType, eventHandler);
}


p$.med.BaseMediator.prototype.modifyAttribute = function(elementId, attribute, value) {
	this.core.getExtension(this.domExtDesc).modifyAttribute(elementId, attribute, value);
}

p$.med.BaseMediator.prototype.appendElement = function(elementId, value) {
	this.core.getExtension(this.domExtDesc).append(elementId, value);
}

p$.med.BaseMediator.prototype.createDialog =  function(elementId, title, height, width, buttons) {
	
	this.core.getExtension(this.dialogExtDesc).createDialog(elementId, title, height, width, buttons);
}

p$.med.BaseMediator.prototype.showDialog =  function(dialogElementId, contentElementId) {
	this.core.getExtension(this.dialogExtDesc).showDialog(dialogElementId, contentElementId);
}





p$.registerFile(p$.med.baseMedFilename);