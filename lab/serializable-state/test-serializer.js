describe("serialize fields", function(){
  var
    define = {
      fields : [
        {
          name: "name",
        }
      ]
  };
  it("should serialize string fields, if field type not set", function(){
    var template = new ox.define(define);
    expect(
        template.encode({name: "First Last"})
    ).toEqual(
        "name=" + encodeURIComponent("First Last")
    );
  })

})