describe("MainController", function () {
  var MainController,
    $log;

  beforeEach(function () {
    module("MyApp");

    inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      MainController = $controller("MainController", { $scope: scope });
      // $log = _$log_;
    });
  });

  describe("suite", function () {
    it("should pass", function () {
      expect(true).toEqual(true);
    });

    it("should return 0", function () {
      expect(scope.doStuff()).toEqual("stuff");
    });

// sinon.spy($log, 'info');

// // Act
// MainController.DoSomething();

// // Assert
// assert($log.info.calledOnce);
// assert($log.info.calledWith('something done!'));

// // Cleanup
// $log.info.restore();
  });
});
