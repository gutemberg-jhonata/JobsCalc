let data = {
    name: "Jhonata Gutemberg",
    avatar: "http://github.com/gutemberg-jhonata.png",
    monthlyBudget: 3000,
    hoursPerDay: 5,
    daysPerWeek: 5,
    vacationPerYear: 4,
    valueHour: 4,
}

module.exports = {
    get() {
        return data;
    },

    update(newData) {
        data = newData;
    }
}