const Job = require('../models/Job');
const Profile = require("../models/Profile");
const JobUtils = require("../utils/JobUtils");

module.exports = {
    async index(req, res) {
        const jobs = Job.get();
        const profile = await Profile.get();
        
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        let freeHours = profile.hoursPerDay;

        const updatedJobs = jobs.map(job => {
            const remaining = JobUtils.remainingDays(job);
            const status = remaining > 0 ? 'progress' : 'done';

            statusCount[status]++;

            if (status === 'progress') {
                freeHours -= Number(job.dailyHours);
            }

            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile.valueHour),
            };
        });

        return res.render("index", { jobs: updatedJobs, profile, statusCount, freeHours });
    }
}