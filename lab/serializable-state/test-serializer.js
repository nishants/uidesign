describe("serialize fields", function(){
  var definition = {fields: [{name: "name"}, {name: "created", type: "date"}]};


  it("should serialize string fields, if field type not set", function(){
    var expected = "name=" + encodeURIComponent("First Last"),
        encoded    = new ox.define(definition).encode({name: "First Last"});

    expect(encoded).toEqual(expected);
  });

  it("should serialize date fields", function(){
    var onDate     = new Date(),
        expected   = "created=" + onDate.getTime(),
        encoded    = new ox.define(definition).encode({created: onDate});

    expect(encoded).toEqual(expected);
  });

  it("should serialize all present fields in params", function(){
    var nameValue = "I am X.",
        onDate     = new Date(),
        expected   = "name=" + encodeURIComponent(nameValue)+ "&" + "created=" + onDate.getTime(),
        encoded    = new ox.define(definition).encode({name: nameValue, created: onDate});

    expect(encoded).toEqual(expected);
  });
})