module.exports = {
    remainingDays(job) {
        const remainingDays = (job.totalHours / job.dailyHours).toFixed();
            
        const createdDate = new Date(job.createdAt);
        const dueDay = createdDate.getDate() + Number(remainingDays);
        const dueDateInMs = createdDate.setDate(dueDay);
        
        const timeDiffInMs = dueDateInMs - Date.now();
        const dayInMs = 1000 * 60 * 60 * 24;
        const dayDiff = Math.ceil(timeDiffInMs / dayInMs);
    
        return dayDiff;
    },

    calculateBudget(job, valueHour) {
        return valueHour * job.totalHours;
    },

    calculateValueHour(vacationPerYear, hoursPerDay, daysPerWeek, monthlyBudget) {
        const weekPerYear = 52;
        const weekPerMonth = (weekPerYear - vacationPerYear) / 12;
        const weekTotalHours = hoursPerDay * daysPerWeek;
        const monthlyTotalHours = weekTotalHours * weekPerMonth;
        const valueHour = monthlyBudget / monthlyTotalHours;
    
        return valueHour;
    }
}