// JavaScript Document

p$.mod.baseModFilename = 'pipeline.module.js';

p$.require("pipeline.common.js", p$.mod.baseModFilename);


p$.mod.BaseModule = function() {
	this.mediator = null;	
}

p$.mod.BaseModule.prototype.setMediator = function(mediator) {
	this.mediator = mediator;
}

p$.mod.BaseModule.prototype.init = function() { }

p$.mod.BaseModule.prototype.destroy = function() { }

p$.registerFile(p$.mod.baseModFilename);