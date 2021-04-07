const Database = require("../db/config");
const JobUtils = require("../utils/JobUtils");

let data = {
    name: "Jhonata Gutemberg",
    avatar: "http://github.com/gutemberg-jhonata.png",
    monthlyBudget: 3000,
    hoursPerDay: 5,
    daysPerWeek: 5,
    vacationPerYear: 4,
    valueHour: 4,
};

module.exports = {
    async get() {
        const db = await Database();

        const data = await db.get(`SELECT * FROM profile`);

        await db.close();

        const valueHour = JobUtils.calculateValueHour(
            data.vacation_per_year,
            data.hours_per_day,
            data.days_per_week,
            data.monthly_budget
        );

        return {
            name: data.name,
            avatar: data.avatar,
            monthlyBudget: data.monthly_budget,
            hoursPerDay: data.hours_per_day,
            daysPerWeek: data.days_per_week,
            vacationPerYear: data.vacation_per_year,
            valueHour,
        };
    },

    update(newData) {
        data = newData;
    },
};
