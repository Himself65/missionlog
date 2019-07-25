"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.log=void 0;var Level;(function(Level){Level[Level["INFO"]=1]="INFO";Level[Level["WARN"]=2]="WARN";Level[Level["ERROR"]=3]="ERROR";Level[Level["OFF"]=4]="OFF"})(Level||(Level={}));var _level={};var _callback;function _log(level,category){if(_callback){if(_level[category]===undefined){_callback("ERROR","missionlog","uninitialized category \"".concat(category,"\""),[])}else{return level>=_level[category]}}return false}var log={init:function init(config,callback){for(var k in config){_level[k]=Level[config[k]]}if(callback!==undefined){_callback=callback}return log},error:function error(category,message){if(_log(Level.ERROR,category)){for(var _len=arguments.length,optionalParams=new Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){optionalParams[_key-2]=arguments[_key]}_callback(Level[Level.ERROR],category,message,optionalParams)}},warn:function warn(category,message){if(_log(Level.WARN,category)){for(var _len2=arguments.length,optionalParams=new Array(_len2>2?_len2-2:0),_key2=2;_key2<_len2;_key2++){optionalParams[_key2-2]=arguments[_key2]}_callback(Level[Level.WARN],category,message,optionalParams)}},info:function info(category,message){if(_log(Level.INFO,category)){for(var _len3=arguments.length,optionalParams=new Array(_len3>2?_len3-2:0),_key3=2;_key3<_len3;_key3++){optionalParams[_key3-2]=arguments[_key3]}_callback(Level[Level.INFO],category,message,optionalParams)}}};exports.log=log;