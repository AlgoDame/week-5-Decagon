"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("../task/app"));
var mock_1 = require("./mock");
describe("Test for function structure", function () {
    it("Returns an object for even distro", function () {
        expect(typeof app_1.default(50, 0)).toBe("object");
        expect(app_1.default(50, 0)).toHaveProperty("boarded");
        expect(app_1.default(50, 0)).toHaveProperty("reservation");
        expect(app_1.default(50, 0)).toHaveProperty("count");
    });
    it("checks that the function is called with 2 arguments", function () {
        expect(app_1.default.length).toEqual(2);
    });
});
describe("Test for function expected value", function () {
    it("Returns evenly distributed values for boarded", function () {
        expect(app_1.default(100, 2).boarded.length % 5).toBe(0);
        expect(app_1.default(127, 3).boarded.length % 5).toBe(0);
        expect(app_1.default(513, 5).boarded.length % 5).toBe(0);
    });
    it("Returns reservation list for uneven distro", function () {
        expect(app_1.default(67, 1).reservation.length).toBe(2);
        expect(app_1.default(101, 4).reservation.length).toBe(1);
        expect(app_1.default(207, 3).reservation.length).toBe(7);
    });
    it("boarded does not exceed 50 people for 60 passengers with shuffle of 0", function () {
        expect(app_1.default(60, 0).boarded.length).toBe(50);
    });
});
describe("test for shuffle", function () {
    it("Single shuffle works ", function () {
        expect(app_1.default(100, 1).count).toEqual(2);
    });
    it("first multiple shuffle works ", function () {
        expect(app_1.default(205, 2).count).toEqual(3);
    });
    it("second multiple shuffle works ", function () {
        expect(app_1.default(400, 3).count).toEqual(4);
    });
    it("third multiple shuffle works ", function () {
        expect(app_1.default(301, 4).count).toEqual(5);
    });
});
describe("test for boarded value with passengers of 50 and shuffle 0", function () {
    var passengers = 50;
    var shuffle = 0;
    var expected = app_1.default(passengers, shuffle);
    expect(expected.boarded).toStrictEqual(mock_1.prefilled);
});
