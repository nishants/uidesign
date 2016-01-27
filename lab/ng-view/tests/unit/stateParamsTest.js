describe('Unit tests setup', function() {
  var stateParam;

  beforeEach(module('routed'));

  beforeEach(inject(function(_stateParam_){
    stateParam = _stateParam_;
  }));

  it('should parse current view', function() {
    expect(stateParam.parse("/campaigns").view).toEqual("campaigns");
  });

  it('should parse current view and state', function() {
    var parsed = stateParam.parse("/campaigns/c_id/view");
    expect(parsed.view).toEqual("campaigns");
    expect(parsed.state.pathParam).toEqual("c_id");
    expect(parsed.state.name).toEqual("view");
  });
});