describe('jquery-stockquotes', function () {
  var expect,
      assert,
      chai = require('chai'),
      sinon = require('sinon'),
      sinonChai = require('sinon-chai');

  before(function () {
    chai.use(sinonChai);
    expect = chai.expect;
    assert = chai.assert;
  });

  describe('test', function () {
    it ('should do something', function () {
      expect(1).to.be(1);
    });
  });
});
