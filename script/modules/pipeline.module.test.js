// JavaScript Document


var test = p$.namespace("pipeline.mod.test");
test.filename = "pipeline.module.test.js";


p$.require("pipeline.common.js", test.filename);
p$.require("pipeline.event.js", test.filename);
p$.require("pipeline.module.js", test.filename);


/*******************************
MainModule
********************************/
test.MainModule = function(id, initParams) {
	this.id = id;
	this.loaderDiv = initParams.loaderDiv;
	this.mainDiv = initParams.mainDiv;
	this.dialogButtonId = initParams.dialogButton;
}

p$.inherit(test.MainModule, p$.mod.BaseModule);

test.MainModule.prototype.init = function() {
	this.mediator.addContextListener(p$.event.core.ALL_MODULES_STARTED, this.allModulesLoadedHandler, "allModulesLoadedHandler", this);
	this.mediator.addViewListener(this.dialogButtonId,  p$.event.view.CLICK, this.dialogClickedHandler, {listener: this});
	this.mediator.createDialog("div-dialog", "My Title", 300, 400, {
		Ok: {name: "Ok", handler: function() {alert("yo!");}},
		Cancel: {name: "Cancel"}
	});
}

test.MainModule.prototype.allModulesLoadedHandler = function(event) {
	p$.trace("MainModule displaying page");
	event.data.listener.mediator.modifyAttribute(event.data.listener.loaderDiv, 'hide');	
	event.data.listener.mediator.modifyAttribute(event.data.listener.mainDiv, 'show');	
	
}

test.MainModule.prototype.dialogClickedHandler = function(event) {
	event.data.listener.mediator.showDialog("div-dialog");
}


/*******************************
LeftModule
********************************/

test.LeftModule = function(id, initParams) {
	this.id = id;
	this.parentDivId = initParams.parentDiv;
	this.buttonId = initParams.button;
}

p$.inherit(test.LeftModule, p$.mod.BaseModule);


test.LeftModule.prototype.init = function() {
	this.mediator.addViewListener(this.buttonId, p$.event.view.CLICK, this.buttonClickedHandler, {listener: this});
	this.mediator.addViewListener(this.parentDivId,  p$.event.view.MOUSEOVER, this.mouseOverHandler, {listener: this});
	this.mediator.addViewListener(this.parentDivId,  p$.event.view.MOUSEOUT, this.mouseOutHandler, {listener: this});
	this.mediator.addContextListener(test.event.RIGHT_CLICKED, this.rightClickedHandler, "rightClickedHandler", this);
	
	//this.formatModule();
	this.mediator.notify(test.event.LEFT_LOADED);
}

test.LeftModule.prototype.buttonClickedHandler = function(event) {
	event.data.listener.mediator.notify(test.event.LEFT_CLICKED);
}

test.LeftModule.prototype.mouseOverHandler = function(event) {
	event.data.listener.mediator.modifyAttribute(event.data.listener.parentDivId, 'cursor', 'pointer');
	event.data.listener.mediator.notify(test.event.LEFT_MOUSE_OVER);
}

test.LeftModule.prototype.mouseOutHandler = function(event) {
	event.data.listener.mediator.notify(test.event.LEFT_MOUSE_OUT);
}


test.LeftModule.prototype.rightClickedHandler = function(event) {
	event.data.listener.mediator.modifyAttribute(event.data.listener.parentDivId, 'background-color', '#0000FF');
}



/*******************************
RightModule
********************************/

test.RightModule = function(id, initParams) {
	this.id = id;
	this.parentDivId = initParams.parentDiv;
	this.buttonId = initParams.button;
}

p$.inherit(test.RightModule, p$.mod.BaseModule);

test.RightModule.prototype.init = function() {
	this.mediator.addViewListener(this.buttonId, p$.event.view.CLICK, this.buttonClickedHandler, {listener: this});
	this.mediator.addContextListener(test.event.LEFT_CLICKED, this.leftClickedHandler, "leftClickedHandler", this);
	this.mediator.addContextListener(test.event.LEFT_MOUSE_OVER, this.leftMouseOverHandler, "leftMouseOverHandler", this);
	this.mediator.addContextListener(test.event.LEFT_MOUSE_OUT, this.leftMouseOutHandler, "leftMouseOutHandler", this);
	
	//this.formatModule();
	this.mediator.notify(test.event.RIGHT_LOADED);
}

test.RightModule.prototype.buttonClickedHandler = function(event) {

	event.data.listener.mediator.notify(test.event.RIGHT_CLICKED);
}

test.RightModule.prototype.leftClickedHandler = function(event) {
	event.data.listener.mediator.modifyAttribute(event.data.listener.parentDivId, 'background-color', '#FF0000');
}



test.RightModule.prototype.leftMouseOverHandler = function(event) {
	event.data.listener.mediator.modifyAttribute(event.data.listener.buttonId, 'value', 'Get off him!');
}




test.RightModule.prototype.leftMouseOutHandler = function(event) {
	event.data.listener.mediator.modifyAttribute(event.data.listener.buttonId, 'value', 'That\'s better');
	
}



/**************************
Events
**************************/
test.event = {
	RIGHT_LOADED: 'rightModuleLoaded',
	RIGHT_CLICKED: 'rightClicked',
	LEFT_LOADED: 'leftModuleLoaded',
	LEFT_CLICKED: 'leftClicked',
	LEFT_MOUSE_OVER: 'leftMouseOver',
	LEFT_MOUSE_OUT: 'leftMouseOut',
	CLICK: 'click'
}
