function createEmployeeRecord(arr){
    const obj = {
        firstName: arr[0], 
        familyName: arr[1], 
        title: arr[2], 
        payPerHour: arr[3], 
        timeInEvents: [], 
        timeOutEvents:[]
    }
    return obj
}

function createEmployeeRecords(arr){
    const records =  arr.map(arrNested => createEmployeeRecord(arrNested))
    return records
}

function createTimeInEvent(str){
    let dt= str.split(' ')[0]
    let hr= str.split(' ')[1]
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hr),
        date: dt
    })
    return this
}

function createTimeOutEvent (str){
    let dt= str.split(' ')[0]
    let hr= str.split(' ')[1]
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hr),
        date: dt
    })
    return this
}

function hoursWorkedOnDate (str){
    let timeIn = this.timeInEvents.find(obj => obj.date === str)
    let timeOut = this.timeOutEvents.find(obj => obj.date === str)
    let hrs = (timeOut.hour - timeIn.hour)/100
    return hrs
}

function wagesEarnedOnDate(str){
    let wages = hoursWorkedOnDate.call(this, str) * this.payPerHour
    return wages
}

function findEmployeeByFirstName (arr, str){
    let match = arr.find(arrNested => arrNested.firstName === str)
    return match
}

function calculatePayroll (arr){
    let payRoll = arr.reduce((accum, obj) => accum + allWagesFor.call(obj), 0)
    return payRoll
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

