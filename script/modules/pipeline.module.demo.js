// JavaScript Document


p$.mod.demo = p$.namespace("pipeline.mod.demo");
p$.mod.demo.filename = "pipeline.module.demo.js";


p$.require("pipeline.common.js", p$.mod.demo.filename);
p$.require("pipeline.event.js", p$.mod.demo.filename);
p$.require("pipeline.module.js", p$.mod.demo.filename);



/*******************************
MainModule
********************************/
p$.mod.demo.MainModule = function(id, initParams) {
	this.id = id;
	this.loaderDiv = initParams.loaderDiv;
	this.mainDiv = initParams.mainDiv;
}

p$.inherit(p$.mod.demo.MainModule, p$.mod.BaseModule);

p$.mod.demo.MainModule.prototype.init = function() {
	this.mediator.addContextListener(p$.event.core.ALL_MODULES_STARTED, this, 
		"allModulesLoadedHandler", 
		function(event) {
			p$.trace("MainModule displaying page");
			event.data.listener.mediator.modifyAttribute(event.data.listener.loaderDiv, 'hide');	
			event.data.listener.mediator.modifyAttribute(event.data.listener.mainDiv, 'show');	
		
		});
}

/*******************************
DataModule
********************************/

p$.mod.demo.DataModule = function(id, initParams) {
	this.id = id;
	this.pageIds = ["menu1", "menu2", "menu3"];
	this.menuModel = {
		menu1: "Home",
		menu2: "Jobs",
		menu3: "Admin"
	}
	
	this.contentModel = {
		menu1: "Content for Page 1",
		menu2: "I am Page 2's content",
		menu3: "Here is Page 3"	
	}
	
}

p$.inherit(p$.mod.demo.DataModule, p$.mod.BaseModule);

p$.mod.demo.DataModule.prototype.init = function() {
	
	this.mediator.addContextListener(p$.mod.demo.event.MENU_CLICK, this, 
		"menuClickHandler", 
		function(event) {
			p$.trace(event);
			var listener = event.listener;
			listener.mediator.notify(p$.mod.demo.event.CONTENT_CHANGED, {
				menuId: event.data, 
				content: listener.contentModel[event.data]});
		});
		
	this.mediator.addContextListener(p$.event.core.ALL_MODULES_STARTED, this, 
		"allModulesLoadedHandler", this.allModulesLoadedHandler);
}

p$.mod.demo.DataModule.prototype.allModulesLoadedHandler = function(event) {
	//load data
	var listener = event.data.listener;
	listener.mediator.notify(p$.mod.demo.event.INIT_MENU, {menuItems: listener.menuModel});	
	
	listener.mediator.notify(p$.mod.demo.event.CONTENT_CHANGED, {
		menuId: listener.pageIds[0], 
		content: listener.contentModel[listener.pageIds[0]]});
}


/*******************************
MenuModule
********************************/
p$.mod.demo.MenuModule = function(id, initParams) {
	this.id = id;
	this.nav = initParams.nav;
	this.selectedMenu = "Menu1";
}

p$.inherit(p$.mod.demo.MenuModule, p$.mod.BaseModule);

p$.mod.demo.MenuModule.prototype.init = function() {	
	this.mediator.addContextListener(p$.mod.demo.event.INIT_MENU, this, "initMenuHandler", this.initMenuHandler);
	this.mediator.addContextListener(p$.mod.demo.event.CONTENT_CHANGED, this, "updateMenuHandler", this.updateMenuHandler);
	
	
}

p$.mod.demo.MenuModule.prototype.initMenuHandler = function(event) {
	p$.trace(event.data);
	var menuModel = event.data.menuItems;
	var thisListener = event.data.listener;
	for (i in menuModel) {
		var menuItem = '<li><a id="' + i + '" href="javascript:void(0);">' + menuModel[i] +'</a></li>';
		thisListener.mediator.appendElement(thisListener.nav, menuItem);	
		thisListener.mediator.addViewListener(i, p$.event.view.CLICK, {listener: thisListener, menuItem: i}, thisListener.handleMenuClick);
	}	
}

p$.mod.demo.MenuModule.prototype.updateMenuHandler = function(event) {
	
	var mediator = event.data.listener.mediator;
	var currentMenuId = event.data.listener.selectedMenu;
	mediator.modifyAttribute(currentMenuId, "removeClass", "selectedMenu");
	mediator.modifyAttribute(event.data.menuId, "addClass", "selectedMenu");
	event.data.listener.selectedMenu = event.data.menuId;
}

p$.mod.demo.MenuModule.prototype.handleMenuClick = function(event) {
	p$.trace(event);
	event.data.listener.mediator.notify(p$.mod.demo.event.MENU_CLICK, event.data.menuItem);
}



/*******************************
ContentModule
********************************/
p$.mod.demo.ContentModule = function(id, initParams) {
	this.id = id;
	this.contentDiv = initParams.contentDiv;
}

p$.inherit(p$.mod.demo.ContentModule, p$.mod.BaseModule);

p$.mod.demo.ContentModule.prototype.init = function() {
	this.mediator.addContextListener(p$.mod.demo.event.CONTENT_CHANGED, this, "contentChangedHandler", this.contentChangedHandler);
	
	//this.mediator.modifyAttribute(this.contentDiv, "html", "");
	//this.mediator.appendElement(this.contentDiv, p$.mod.demo.pageContent["Menu 1"]);
}

p$.mod.demo.ContentModule.prototype.contentChangedHandler = function(event){
	var listener = event.data.listener;
	listener.mediator.modifyAttribute(event.data.listener.contentDiv, "html", "");
	listener.mediator.appendElement(event.data.listener.contentDiv, event.data.content);
}




p$.mod.demo.event = {
	MENU_CLICK: 'menuClick',
	INIT_MENU: 'initMenu',
	CONTENT_CHANGED: 'contentChanged'
}
