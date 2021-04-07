const Profile = require("../models/Profile");
const JobUtils = require("../utils/JobUtils");

module.exports = {
    async index(req, res) {
        return res.render("profile", { profile: await Profile.get() });
    },
    
    async update(req, res) {
        const data = req.body;
        const valueHour = JobUtils.calculateValueHour(
            data.vacationPerYear, 
            data.hoursPerDay, 
            data.daysPerWeek, 
            data.monthlyBudget
        );

        const profile = await Profile.get();

        Profile.update({
            ...profile,
            ...req.body,
            valueHour
        });
    
        return res.redirect('/profile');
    }
}