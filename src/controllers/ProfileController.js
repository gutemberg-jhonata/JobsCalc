const Profile = require("../models/Profile");

module.exports = {
    index(req, res) {
        return res.render("profile", { profile: Profile.get() });
    },
    
    update(req, res) {
        const data = Profile.get();
    
        const weekPerYear = 52;
        const weekPerMonth = (weekPerYear - data.vacationPerYear) / 12;
        const weekTotalHours = data.hoursPerDay * data.daysPerWeek;
        const monthlyTotalHours = weekTotalHours * weekPerMonth;
        const valueHour = data.monthlyBudget / monthlyTotalHours;
        
        Profile.update({
            ...Profile.get(),
            ...req.body,
            valueHour
        });
    
        return res.redirect('/profile');
    }
}