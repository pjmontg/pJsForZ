// JavaScript Document
p$.ex.filename='pipeline.exception.js';

p$.require("pipeline.common.js", p$.ex.filename);



//UninitializedException
p$.ex.UninitializedException = function(message) {
		this.message = "UninitializedException: " + message;
		this.callbackHandler = function() {
			alert(this.message);	
		}
}

p$.inherit(p$.ex.UninitializedException, p$.ex.Exception);


//IllegalArgumentException
p$.ex.IllegalArgumentException = function(message) {
		this.message = "IllegalArgumentException: " + message;
		
}

p$.inherit(p$.ex.IllegalArgumentException, p$.ex.Exception);


//PageNotFoundException
p$.ex.PageNotFoundException = function(message) {
		this.message = "PageNotFoundException: " + message;
		
}

p$.inherit(p$.ex.PageNotFoundException, p$.ex.Exception);



p$.ex.ModuleAlreadyRunningException = function(message) {
		this.message = "ModuleAlreadyRunningException: " + message;	
}

p$.inherit(p$.ex.ModuleAlreadyRunningException, p$.ex.Exception);






p$.ex.HandlerNotFoundException = function(message) {
		this.message = "HandlerNotFoundException: " + message;	
}

p$.inherit(p$.ex.HandlerNotFoundException, p$.ex.Exception);



p$.ex.ContextListenerException = function(message) {
		this.message = "ContextListenerException: " + message;	
}

p$.inherit(p$.ex.ContextListenerException, p$.ex.Exception);


p$.ex.ExtensionConflictException = function(message) {
		this.message = "ExtensionConflictException: " + message;	
}

p$.inherit(p$.ex.ExtensionConflictException, p$.ex.Exception);


p$.ex.ExtensionNotFoundException = function(message) {
		this.message = "ExtensionNotFoundException: " + message;	
}

p$.inherit(p$.ex.ExtensionNotFoundException, p$.ex.Exception);


p$.registerFile(p$.ex.filename);