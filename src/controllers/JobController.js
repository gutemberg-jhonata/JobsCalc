const Job = require("../models/Job");
const Profile = require("../models/Profile");

const jobUtils = require("../utils/JobUtils");

module.exports = {
    index(req, res) {
        const jobs = Job.get();
        const profile = Profile.get();

        const updatedJobs = jobs.map(job => {
            const remaining = jobUtils.remainingDays(job);
            const status = remaining > 0 ? 'progress' : 'done';

            return {
                ...job,
                remaining,
                status,
                budget: jobUtils.calculateBudget(job, profile.valueHour),
            };
        });

        return res.render("index", { jobs: updatedJobs });
    },

    create(req, res) {
        return res.render("job");
    },

    save(req, res) {
        const jobs = Job.get();
        const lastId = jobs[jobs.length - 1]?.id || 0;

        Job.save({
            id: lastId + 1,
            ...req.body,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });

        return res.redirect('/');
    },

    show(req, res) {
        const { id } = req.params;
        const jobs = Job.get();
        const profile = Profile.get();

        const job = jobs.find(job => Number(job.id) === Number(id));

        if (!job) {
            return res.send('Job not found!');
        }

        job.budget = jobUtils.calculateBudget(job, profile.valueHour);

        return res.render("job-edit", { job });
    },

    update(req, res) {
        const { id } = req.params;
        const jobs = Job.get();

        const job = jobs.find(job => Number(job.id) === Number(id));

        if (!job) {
            return res.send('Job not found!');
        }

        const updatedJob = {
            ...job,
            ...req.body
        }

        const newJobs = jobs.map(job => {
            if (Number(job.id) === Number(id)) {
                job = updatedJob;
            }

            return job;
        });

        Job.update(newJobs);

        return res.redirect('/job/' + job.id);
    },

    delete(req, res) {
        const { id } = req.params;

        Job.delete(id);

        return res.redirect('/');
    }
}