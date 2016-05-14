(function(){
  "use strict"
  var encodeString = function(value){return encodeURIComponent(value);},
      encodeDate   = function(value){return value.getTime();},
      fieldType = {
        undefined : {encode : encodeString},
        String    : {encode : encodeString},
        string    : {encode : encodeString},
        date      : {encode : encodeDate},
        Date      : {encode : encodeDate}
      },
      Field = function(definition){
        this.name = definition.name
        this.type = fieldType[definition.type];
      };

  Field.prototype.encode = function(value){
    return this.name+"=" + this.type.encode(value);
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
      var field      = this.template.fields[i],
          fieldValue = params[field.name];
      hash += fieldValue ? (field.encode(fieldValue) + "&") : "";
    }
    return hash.slice(0, hash.length - 1);
  };

  window.ox = {
    define : function(template){
      return new State(template);
    }
  };
}).call(this);