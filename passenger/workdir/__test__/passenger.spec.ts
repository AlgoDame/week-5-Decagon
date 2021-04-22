import task from "../task/app";
import { prefilled } from "./mock";

describe("Test for function structure", () => {
  it("Returns an object for even distro", () => {});

  it("checks that the function is called with 2 arguments", () => {});
});

describe("Test for function expected value", () => {
  it("Returns evenly distributed values for boarded", () => {});

  it("Returns reservation list for uneven distro", () => {});

  it("boarded does not exceed 50 people for 60 passengers with shuffle of 0", () => {});
});

describe("test for shuffle", () => {
  it("Single shuffle works ", () => {});

  it("first multiple shuffle works ", () => {});

  it("second multiple shuffle works ", () => {});

  it("third multiple shuffle works ", () => {});
});

describe("test for boarded value with passengers of 50 and shuffle 0", () => {
  let passengers = 50;
  let shuffle = 0;

  const expected = task(passengers, shuffle);
  expect(expected.boarded).toStrictEqual(prefilled);
});
