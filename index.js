/* Your Code Here */
const createEmployeeRecord = (array) => {

    const record = {
        "firstName": array[0],
        "familyName": array[1],
        "title": array[2],
        "payPerHour": array[3],
        "timeInEvents": [],
        "timeOutEvents": []
    }

    return record
}

const createEmployeeRecords = (array) => {

    const records = []

    array.forEach(element => {
        records.push(createEmployeeRecord(element))
    })

    return records

}

function createTimeInEvent(timeStamp) {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: Number(timeStamp.split(" ")[1]),
        date: timeStamp.split(" ")[0]
    })

    return this
}

function createTimeOutEvent(timeStamp) {

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: Number(timeStamp.split(" ")[1]),
        date: timeStamp.split(" ")[0]
    })

    return this
}


function hoursWorkedOnDate(date) {
    const timeIn = this["timeInEvents"].find(x => x["date"] === date)["hour"]
    const timeOut = this["timeOutEvents"].find(x => x["date"] === date)["hour"]
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(date) {

    const housrWorked = hoursWorkedOnDate.bind(this)
    return housrWorked(date) * this["payPerHour"]
}

function findEmployeeByFirstName(srcArray, firstName) {

    return srcArray.find(employee => employee.firstName === firstName)
}

function calculatePayroll(recordsArray) {

    let totalPay = 0
    for (let i = 0; i < recordsArray.length; i++) {
        let dates = recordsArray[i]["timeInEvents"]
        
        const wagesEarned = wagesEarnedOnDate.bind(recordsArray[i])
        for (let j = 0; j < dates.length; j++) {
            totalPay = totalPay + wagesEarned(dates[j]["date"])

        }
    }

    return totalPay

}
// /*
//  We're giving you this function. Take a look at it, you might see some usage
//  that's new and different. That's because we're avoiding a well-known, but
//  sneaky bug that we'll cover in the next few lessons!

//  As a result, the lessons for this function will pass *and* it will be available
//  for you to use if you need it!
//  */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

