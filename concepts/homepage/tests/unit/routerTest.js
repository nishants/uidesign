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

  it('should find view, and invoke render', function() {
    router.load("/campaigns");
    expect(campaigns.load).toHaveBeenCalledWith("")
  });

  it('should pass state param if present', function() {
    var stateId = "%7B%22name%22%3A%22Nishant%20Singh%22%2C%22address%22%3A%7B%22street%22%3A%22aurangabad%22%2C%22city%22%3A%22varanasi%22%7D%7D"
    router.load("/campaigns?state=" + stateId);
    expect(campaigns.load).toHaveBeenCalledWith(stateId)
  });

});