"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("../task/app"));
var mock_1 = require("./mock");
describe("Test for function structure", function () {
    it("Returns an object for even distro", function () { });
    it("checks that the function is called with 2 arguments", function () { });
});
describe("Test for function expected value", function () {
    it("Returns evenly distributed values for boarded", function () { });
    it("Returns reservation list for uneven distro", function () { });
    it("boarded does not exceed 50 people for 60 passengers with shuffle of 0", function () { });
});
describe("test for shuffle", function () {
    it("Single shuffle works ", function () { });
    it("first multiple shuffle works ", function () { });
    it("second multiple shuffle works ", function () { });
    it("third multiple shuffle works ", function () { });
});
describe("test for boarded value with passengers of 50 and shuffle 0", function () {
    var passengers = 50;
    var shuffle = 0;
    var expected = app_1.default(passengers, shuffle);
    expect(expected.boarded).toStrictEqual(mock_1.prefilled);
});
