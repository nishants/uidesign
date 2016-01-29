describe("serialize fields", function(){
  var definition        = {fields: [{name: "name"}, {name: "created", type: "date"}, {name: "alwaysMissing", type: "date"}]},
      nameValue         = "some Name string 129012 /-=7#$%@#$%&^*&*()",
      expectedNameHash  ="name="+encodeURIComponent(nameValue),
      onDate            = new Date(),
      onDateHash        = "created=" + onDate.getTime(),
      serializer        = new ox.define(definition);

  it("should serialize string fields, if field type not set", function(){
    var encoded    = serializer.encode({name: nameValue});
    expect(encoded).toEqual(expectedNameHash);
  });

  it("should serialize date fields", function(){
    var onDate     = new Date(),
        expected   = "created=" + onDate.getTime(),
        encoded    = new ox.define(definition).encode({created: onDate});

    expect(encoded).toEqual(expected);
  });

  it("should serialize all present fields in params", function(){
    var nameValue = "I am X.",
        expected   = "name=" + encodeURIComponent(nameValue)+ "&" + "created=" + onDate.getTime(),
        encoded    = new ox.define(definition).encode({name: nameValue, created: onDate});

    expect(encoded).toEqual(expected);
  });

  it("should ignore undefined fields and methods present on params", function(){
    var nameValue = "I am X.",
        onDate     = new Date(),
        expected   = "name=" + encodeURIComponent(nameValue)+ "&" + "created=" + onDate.getTime(),
        encoded    = new ox.define(definition).encode({name: nameValue, created: onDate, extraField1: "some field name", extraField2: new Date(), someMethod: function(){}});

    expect(encoded).toEqual(expected);
  });
})