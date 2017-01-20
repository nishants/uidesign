describe('Testing Services', function() {
  var service,
      ServiceTwo,
      $q,
      $httpBackend;

  beforeEach(function() {
    module('my-app');
    module(function($provide) {
      $provide.value('ServiceTwo', ServiceTwo);
    });

    ServiceTwo = {
      ping: function() { return 'foobar'; },
      get: function(){
        var deferred = $q.defer();
        deferred.resolve({two : {message: "promised data from other service"}});
        return deferred.promise;
      }
    };

    inject(function (_myService_, $injector, _$q_) {
      service       = _myService_;
      $httpBackend  = $injector.get('$httpBackend');
      $q = _$q_;
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
    expect(service.ping()).toEqual("foobar");
  });

  it("2. Mock Promise", function () {
    service.get().then(function(){
      expect(service.fromTwo.message).toEqual("promised data from other service");
    })
  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
});