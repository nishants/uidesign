describe('Router Tests', function() {
  var router;

  beforeEach(module('routed'));

  beforeEach(inject(function(_router_){
    router = _router_;
  }));

  it('should load url and set view.name', function() {
    router.load("/campaigns");
    expect(router.view.name).toEqual("campaigns");
  });

  it('should load url and set view.state', function() {
    router.load("/campaigns/a15ths/view");
    expect(router.view.name).toEqual("campaigns");
    expect(router.state.name).toEqual("view");
  });
});