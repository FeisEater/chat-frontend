describe("XDirective", function () {
  var element;
  var outerScope;
  var innerScope;

  beforeEach(inject(function ($rootScope, $compile) {
    element = angular.element('<super-button label="myLabel" on-click="myCallback()"></super-button>');

    outerScope = $rootScope;
    $compile(element)(outerScope);

    innerScope = element.isolateScope();

    outerScope.$digest();
  }));

  describe("suite", function () {
    it("should pass", function () {
      expect(true).toEqual(true);
    });
  });
});
