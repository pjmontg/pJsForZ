// JavaScript Document

p$.core.filename = "pipeline.core.js";

p$.require("pipeline.common.js", p$.core.filename);
p$.require("pipeline.exception.js", p$.core.filename);
p$.require("pipeline.event.js", p$.core.filename);
p$.require("pipeline.mediator.js", p$.core.filename);

p$.core.Core = new function() {
	var moduleData = {};
	var loadedExtensions = new Array();
	var coreMediator = new p$.med.Mediator(this);
	
	return {
		registerModule: function (moduleId, moduleConstructor, mediatorConstructor, params) {
			moduleData[moduleId] = {
				module: moduleConstructor,
				mediator: mediatorConstructor,
				id : moduleId, 
				initParams: params,
				instance: null
			}
		},
		
		startModule: function(moduleId) {
			if (moduleId === undefined)	{
				throw new p$.ex.IllegalArgumentException("Module ID is required.");	
			}

			if (moduleData[moduleId].instance === null) {
				moduleData[moduleId].instance = new moduleData[moduleId].module(moduleData[moduleId].id + "-" + moduleData.length, moduleData[moduleId].initParams);
				moduleData[moduleId].instance.setMediator(new moduleData[moduleId].mediator(this));
			
				moduleData[moduleId].instance.init();
			} else {
				throw new p$.ex.ModuleAlreadyRunningException("The module " + moduleId + " is already running.");	
			}
			
		},
		
		stopModule: function(moduleId) {
			if (moduleId === undefined)	{
				throw new p$.ex.IllegalArgumentException("Module ID is required.");	
			}
			
			var module = moduleData[moduleId];
			if (module.instance) {
				module.instance.destroy();
				module.instance = null;	
			}
		},
		
		startAll: function() {
			p$.trace("Starting All Modules");
			for (var moduleId in moduleData) {
				if (moduleData.hasOwnProperty(moduleId)) {
					this.startModule(moduleId);	
				}
				
			}
			
			coreMediator.notify(p$.event.core.ALL_MODULES_STARTED);
			p$.trace("All Modules Started");
		},
		
		stopAll: function() {
			for (var moduleId in moduleData) {
				if (moduleData.hasOwnProperty(moduleId)) {
					this.stopModule(moduleId);	
				}
			}	
			coreMediator.notify(p$.event.core.ALL_MODULES_STOPPED);
		},
		
		loadExtension: function(extensionPackage) {
			var key = extensionPackage.id + "|" + extensionPackage.version;
			if (loadedExtensions[key] !== undefined) {
				throw new p$.ex.ExtensionConflictException("Core extension " + extensionDescriptor.id + " v" + extensionDescriptor.version + " already exists");
			}
			
			loadedExtensions[key] = key;
			
			var version = extensionPackage.version.replace(".", "_");
			
			var newExtNamespace = p$.namespace("pipeline.core.Core.ext." + extensionPackage.id + "." + version);
			
			for (i in extensionPackage.contents) {
				newExtNamespace[extensionPackage.contents[i].name] = extensionPackage.contents[i].obj;
			}
			
			if (extensionPackage.init !== undefined) {
				extensionPackage.init();
			}
			
		},
		
		unloadExtension: function(extensionPackage) {
			if (extensionPackage.destroy !== undefined) {
				extensionPackage.destroy();	
				var key = extensionPackage.id + "|" + extensionPackage.version;
				delete loadedExtensions[key];
			}
		},
		
		requireExtension: function(extensionDescriptor) {
			if (loadedExtensions[extensionDescriptor.id + "|" + extensionDescriptor.version] === undefined) {
				throw new p$.ex.ExtensionNotFoundException("Core extension " + extensionDescriptor.id + " v" + extensionDescriptor.version + " is not loaded.");
			}
		},
		
		getExtension: function(extDescriptor) {
			var version = extDescriptor.version.replace(".", "_");
			var namespace = p$.namespace("pipeline.core.Core.ext." + extDescriptor.id + "." + version);
			return namespace;
		}
		
	}
}();




p$.registerFile(p$.core.filename);


