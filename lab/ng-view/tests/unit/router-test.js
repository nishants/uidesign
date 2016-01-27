describe('Unit tests setup', function() {
  var $compile,
      $rootScope;

  beforeEach(module('routed'));

  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  it('Say Hello', function() {
    expect("hello").toContain("llo");
  });
});