describe("serialize fields", function(){
  var definition        = {fields: [{name: "name"}, {name: "created", type: "date"}, {name: "alwaysMissing", type: "date"}]},
      nameValue         = "some Name string 129012 /-=7#$%@#$%&^*&*()",
      nameValueHash     = "name="+encodeURIComponent(nameValue),
      onDate            = new Date(),
      onDateHash        = "created=" + onDate.getTime(),
      serializer        = new ox.define(definition);

  it("should serialize empty params", function(){
    var encoded    = serializer.encode({});
    expect(encoded).toEqual("");
  });

  it("should serialize string fields, if field type not set", function(){
    var encoded    = serializer.encode({name: nameValue});
    expect(encoded).toEqual(nameValueHash);
  });

  it("should serialize date fields", function(){
    var encoded = serializer.encode({created: onDate});
    expect(encoded).toEqual(onDateHash);
  });

  it("should serialize all present fields in params", function(){
    var encoded = serializer.encode({name: nameValue, created: onDate});
    expect(encoded).toEqual(nameValueHash + "&" + onDateHash);
  });

  it("should ignore undefined fields and methods present on params", function(){
    var encoded = serializer.encode({name: nameValue, created: onDate, extraField1: "some field name", extraField2: new Date(), someMethod: function(){}});
    expect(encoded).toEqual(nameValueHash + "&" + onDateHash);
  });
})