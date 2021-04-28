import task from "../task/app";
import { prefilled } from "./mock";

describe("Test for function structure", () => {
  it("Returns an object for even distro", () => {
    expect(typeof task(50, 0)).toBe("object");
    expect(task(50,0)).toHaveProperty("boarded");
    expect(task(50, 0)).toHaveProperty("reservation");
    expect(task(50,0)).toHaveProperty("count");
  });

  it("checks that the function is called with 2 arguments", () => {
    expect(task.length).toEqual(2);
  });
});

describe("Test for function expected value", () => {
  it("Returns evenly distributed values for boarded", () => {
    expect(task(100, 2).boarded.length% 5).toBe(0);
    expect(task(127,3).boarded.length%5).toBe(0);
    expect(task(513, 5).boarded.length%5).toBe(0);
  });

  it("Returns reservation list for uneven distro", () => {
    expect(task(67, 1).reservation.length).toBe(2);
    expect(task(101, 4).reservation.length).toBe(1);
    expect(task(207, 3).reservation.length).toBe(7);
  });

  it("boarded does not exceed 50 people for 60 passengers with shuffle of 0", () => {
    expect(task(60, 0).boarded.length).toBe(50);
  });
});

describe("test for shuffle", () => {
  it("Single shuffle works ", () => {
    expect(task(100, 1).count).toEqual(2);
  });

  it("first multiple shuffle works ", () => {
    expect(task(205, 2).count).toEqual(3);
  });

  it("second multiple shuffle works ", () => {
    expect(task(400, 3).count).toEqual(4);
  });

  it("third multiple shuffle works ", () => {
    expect(task(301, 4).count).toEqual(5);
  });
});

describe("test for boarded value with passengers of 50 and shuffle 0", () => {
  let passengers = 50;
  let shuffle = 0;

  const expected = task(passengers, shuffle);
  expect(expected.boarded).toStrictEqual(prefilled);
});
