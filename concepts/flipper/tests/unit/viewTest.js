describe('View Switching', function() {
  var config,
      View,
      switchTo = jasmine.createSpy();;

  beforeEach(module('xsaas'));

  beforeEach(inject(function(_config_, layout, _View_){
    layout.switchTo = switchTo
    config = _config_;
    View = _View_;
  }));

  it('layout.switchTo(viewIndex, stateIndex) should be invoked, on loading a view', function() {
    var viewIndex   =  1,
        stateIndex  = 2,
        view = config.routes[viewIndex],
        state = view.states[stateIndex];
    View.forName(view.name).load({name: state.name});

    expect(switchTo).toHaveBeenCalledWith(viewIndex, stateIndex);
  });

  it('first state in view should be invoked be default if no state params', function() {
    var viewIndex   =  1,
        expectedStateIndex  = 0,
        view = config.routes[viewIndex];

    View.forName(view.name).load({});

    expect(switchTo).toHaveBeenCalledWith(viewIndex, expectedStateIndex);
  });

});