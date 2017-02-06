describe("ApiService", function () {
  var ApiService,
    $log;

  beforeEach(function () {
    module("MyApp");

    // Angular devs noticed that ApiService = ApiService would result in error
    // that's why they added underlines so deal with it
    inject(function (_ApiService_) {
      ApiService = _ApiService_;
      // $log = _$log_;
    });
  });

  describe("suite", function () {
    it("should pass", function () {
      expect(true).toEqual(true);
    });

    it("should return 0", function () {
      expect(ApiService.syncMethod()).toEqual(0);
    });
  });
});
