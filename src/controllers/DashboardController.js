const Job = require('../models/Job');
const Profile = require("../models/Profile");
const JobUtils = require("../utils/JobUtils");

module.exports = {
    index(req, res) {
        const jobs = Job.get();
        const profile = Profile.get();

        const updatedJobs = jobs.map(job => {
            const remaining = JobUtils.remainingDays(job);
            const status = remaining > 0 ? 'progress' : 'done';

            return {
                ...job,
                remaining,
                status,
                budget: jobUtils.calculateBudget(job, profile.valueHour),
            };
        });

        return res.render("index", { jobs: updatedJobs });
    }
}