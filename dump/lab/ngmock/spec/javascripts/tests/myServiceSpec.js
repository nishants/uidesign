describe('myService', function() {
  var service,
      $httpBackend;

  beforeEach(module('my-app'));

  beforeEach(inject(function (_myService_, $injector) {
    service       = _myService_;
    $httpBackend  = $injector.get('$httpBackend');
  }));

  it("http backend", function () {
    var data     = {id: "1"};
    $httpBackend.when('GET', '/api').respond(data);

    service.save();
    $httpBackend.flush();

    expect(service.data).toEqual(data);
  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});