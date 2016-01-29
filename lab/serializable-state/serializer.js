(function(){
  "use strict"
  var Field = function(definition){
    this.definition = definition;
  };

  Field.prototype.encode = function(params){
    return this.definition.name+"=" + encodeURIComponent(params[this.definition.name]);
  };

  var Template = function(definition){
    var fields = [];
    for(var i = 0; i < definition.fields.length; i++){
      fields.push(new Field(definition.fields[i]));
    }
    this.fields = fields;
  };

  var State = function(template){
    this.template = new Template(template);
  };

  State.prototype.encode = function(params){
    var hash = "";
    for(var i = 0; i < this.template.fields.length; i++){
      hash += this.template.fields[i].encode(params);
    }
    return hash;
  };

  window.ox = {
    define : function(template){
      return new State(template);
    }
  };
}).call(this);