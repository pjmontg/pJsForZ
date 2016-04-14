// pipeline.common.js
//TODO: copyright and comments

pipeline = {
	registeredFiles : new Array(),
	
	registerFile : function(filename) {
		if (this.registeredFiles[filename] !== undefined) {
			this.error("File " + filename + " has already been registered.");
			throw new this.exception.Exception();	
		}
		this.registeredFiles[filename] = filename;
	},
	
	//Checks if a required file has been registered (i.e. loaded into memory)
	require : function (requiredFile, requestingFile) {
		if (this.registeredFiles[requiredFile] === undefined || this.registeredFiles[requiredFile] === null) {
			var message = "File '" + requiredFile + "' is required by " + requestingFile + " but has not been loaded into memory.";
			this.error(message);
			throw new this.exception.Exception();
		}
	},
	
	trace : function(message) {
		if (console !== undefined) {
			console.log(message);	
		} else {
			alert(message);	
		}
	},
	
	error : function(message) {
		if (console !== undefined) {
			console.error(message);	
		} else {
			alert(message);	
		}
	},
	
	
	//Creates new namespaces and retreives existing ones
	namespace : function (namespaceStr) {
		var namespaces = namespaceStr.split(".");
		
		if (window !== undefined) {
			root = window;
		} else {
			var root = {};
		}
		
		if (namespaces.length === 1) {
			root = root[namespaceStr];	
		} else {
			for (var i=0; i < namespaces.length; i++) {
				root[namespaces[i]] = root[namespaces[i]] || {};
				root = root[namespaces[i]];
			}
		}
		
		return root;
	},
	
	inherit : function(child, parent) {
		function subclass() {};
		subclass.prototype = parent.prototype;
		child.prototype = new subclass();
		child.prototype.constructor = child;
	}
	
}

pipeline.exception = {}
pipeline.exception.Exception = function(message, callbackHandler) {
		this.message = message;	
		this.callbackHandler = callbackHandler;
}

pipeline.exception.Exception.prototype.executeCallbackHandler = function() {
	if (this.callbackHandler !== undefined) {
		this.callbackHandler();	
	} else {
		pipeline.error(this.message);	
	}
}


//create nanespaces and aliases
var p$ = pipeline.namespace("pipeline");
p$.ex = pipeline.namespace("pipeline.exception");
p$.mod = pipeline.namespace("pipeline.mod");
p$.med = pipeline.namespace("pipeline.med");
p$.core = pipeline.namespace("pipeline.core");
p$.event = pipeline.namespace("pipeline.event");
p$.ext = pipeline.namespace("pipeline.ext");
p$.ext.ex = pipeline.namespace("pipeline.ext.exception");

p$.registerFile("pipeline.common.js");


