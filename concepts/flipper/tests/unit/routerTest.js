describe('Router Tests', function() {
  var router,
      campaigns = {
        load: jasmine.createSpy()
      };

  beforeEach(module('xsaas'));

  beforeEach(inject(function(_router_, _View_){
    router = _router_;
    render   = jasmine.createSpy();

    _View_.forName = function(name){
      var views = {campaigns :campaigns}
      return views[name];
    }
  }));

  it('should invoke view with empty params if no state in urlquery', function() {
    router.load("/campaigns");
    expect(campaigns.load).toHaveBeenCalledWith({})
  });

  it('should pass state param if present', function() {
    var stateParam = encodeURIComponent(JSON.stringify({name: "view"}));
    router.load("/campaigns?state=" + stateParam);
    expect(campaigns.load).toHaveBeenCalledWith({name: "view"})
  });

});