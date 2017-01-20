describe('Testing Services', function() {
  var service,
      ServiceTwo,
      $httpBackend;

  beforeEach(function() {
    module('my-app');
    module(function($provide) {
      $provide.value('ServiceTwo', ServiceTwo);
    });

    ServiceTwo = {
      get: function() { return 'foobar'; }
    };

    inject(function (_myService_, $injector) {
      service       = _myService_;
      $httpBackend  = $injector.get('$httpBackend');
    });

  });

  it("1. HTTP backend", function () {
    var data     = {id: "1"};
    $httpBackend.when('GET', '/api').respond(data);

    service.save();
    $httpBackend.flush();

    expect(service.data).toEqual(data);
  });

  it("2. Dependent Services", function () {
    expect(service.get()).toEqual("foobar");
  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});