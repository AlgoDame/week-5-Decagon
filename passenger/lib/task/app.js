"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var taskOne = function (passengers, shuffle) {
    //complete your work here
    var routes = ["Abuja", "Benue", "Lagos", "Katsina", "Sambisa"];
    var routeIndex = 0;
    var boarded = [];
    var reservation = [];
    var passengersArray = [];
    var trips = [];
    var count = 0;
    // Get all passengers
    for (var index = 1; index <= passengers; index++) {
        var list = { name: "passenger" + index, location: routes[routeIndex] };
        passengersArray.push(list);
        if (routeIndex === 4) {
            routeIndex = 0;
        }
        else {
            routeIndex++;
        }
    }
    if (passengers < 5) {
        var waitingList = passengersArray.splice(0, passengers);
        reservation = __spreadArrays(waitingList);
    }
    if (passengers >= 5 && passengers <= 50) {
        var numOfWaitingPassengers = passengers % 5;
        var numberToBoard = passengers - numOfWaitingPassengers;
        count++;
        boarded = passengersArray.splice(0, numberToBoard);
        reservation = __spreadArrays(passengersArray);
    }
    if (passengers > 50 && !shuffle) {
        var nextBatch = passengers - 50;
        count++;
        boarded = passengersArray.splice(0, 50);
        reservation = __spreadArrays(passengersArray);
    }
    if (passengersArray.length > 50 && shuffle) {
        boarded = passengersArray.splice(0, 50);
        reservation = passengersArray;
        count++;
        if (passengersArray.length < 50 &&
            shuffle > 0 &&
            passengersArray.length >= 5) {
            var remainder = passengersArray.length - (passengersArray.length % 5);
            boarded = passengersArray.splice(0, remainder);
            count++;
            reservation = __spreadArrays(passengersArray);
        }
    }
    while (passengersArray.length >= 50 && shuffle > 0) {
        console.log(passengersArray.length);
        boarded = passengersArray.splice(0, 50);
        shuffle--;
        reservation = passengersArray;
        if (passengersArray.length < 50 && passengersArray.length >= 5 && shuffle > 0) {
            var remainder = passengersArray.length - (passengersArray.length % 5);
            boarded = passengersArray.splice(0, remainder);
            count++;
            reservation = __spreadArrays(passengersArray);
        }
        count++;
        count;
        console.log(shuffle);
    }
    return {
        boarded: boarded,
        reservation: reservation,
        count: count,
    };
};
console.log(taskOne(80, 1));
exports.default = taskOne;
