const Job = require("../models/Job");
const Profile = require("../models/Profile");

const JobUtils = require("../utils/JobUtils");

module.exports = {
    create(req, res) {
        return res.render("job");
    },

    async save(req, res) {
        await Job.create({
            ...req.body,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });

        return res.redirect('/');
    },

    async show(req, res) {
        const { id } = req.params;
        const jobs = await Job.get();
        const profile = await Profile.get();

        const job = jobs.find(job => Number(job.id) === Number(id));

        if (!job) {
            return res.send('Job not found!');
        }

        job.budget = JobUtils.calculateBudget(job, profile.valueHour);

        return res.render("job-edit", { job });
    },

    async update(req, res) {
        const { id } = req.params;
        
        const updatedJob = {
            ...req.body
        }

        await Job.update(updatedJob, id);

        return res.redirect('/job/' + id);
    },

    async delete(req, res) {
        const { id } = req.params;

        await Job.delete(id);

        return res.redirect('/');
    }
}