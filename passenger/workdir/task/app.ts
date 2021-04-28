const taskOne = (passengers: number, shuffle: number) => {
    //complete your work here
    let routes: string[] = ["Abuja", "Benue", "Lagos", "Katsina", "Sambisa"];
    let routeIndex: number = 0;
    let boarded: object[] = [];
    let reservation: object[] = [];
    let passengersArray: object[] = [];
    let trips = [];
    let count: number = 0;
    // Get all passengers
    for (let index = 1; index <= passengers; index++) {
        let list = { name: `passenger${index}`, location: routes[routeIndex] };
        passengersArray.push(list);
        if (routeIndex === 4) {
            routeIndex = 0;
        } else {
            routeIndex++;
        }
    }
    if (passengers < 5) {
        let waitingList = passengersArray.splice(0, passengers);
        reservation = [...waitingList];
    }
    if (passengers >= 5 && passengers <= 50) {
        let numOfWaitingPassengers = passengers % 5;
        let numberToBoard = passengers - numOfWaitingPassengers;
        count++;
        boarded = passengersArray.splice(0, numberToBoard);
        reservation = [...passengersArray];
    }
    if (passengers > 50 && !shuffle) {
        let nextBatch: number = passengers - 50;
        count++;
        boarded =  passengersArray.splice(0, 50);
        reservation = [...passengersArray];
    }

    if (passengersArray.length > 50 && shuffle) {
        boarded = passengersArray.splice(0, 50);
        reservation = passengersArray;
        count++;
        if (
            passengersArray.length < 50 &&
            shuffle > 0 &&
            passengersArray.length >= 5
        ) {
            let remainder = passengersArray.length - (passengersArray.length % 5);
            boarded = passengersArray.splice(0, remainder);
            count++;
            reservation = [...passengersArray];
        }
    }
    while (passengersArray.length >= 50 && shuffle > 0) {
        console.log(passengersArray.length);
        boarded = passengersArray.splice(0, 50);
        shuffle--;
        reservation = passengersArray;
        
        if (passengersArray.length < 50 && passengersArray.length >= 5 && shuffle > 0) {
            let remainder = passengersArray.length - (passengersArray.length % 5);
            boarded = passengersArray.splice(0, remainder);
            count++;
            reservation = [...passengersArray];
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
console.log(taskOne(80, 1))

export default taskOne;
