const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/";

const profile = {
    name: "Jhonata Gutemberg",
    avatar: "http://github.com/gutemberg-jhonata.png",
    monthlyBudget: 3000,
    hoursPerDay: 5,
    daysPerWeek: 5,
    vacationPerYear: 4,
    valueHour: 4,
}

const jobs = [
    {
        id: 1,
        name: "Pizzaria Guloso",
        dailyHours: 2,
        totalHours: 40,
        budget: 4500,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    },
    {
        id: 2,
        name: "OneTwo Project",
        dailyHours: 3,
        totalHours: 47,
        budget: 45000,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    }
];

function remainingDays(job) {
    const remainingDays = (job.totalHours / job.dailyHours).toFixed();
        
    const createdDate = new Date(job.createdAt);
    const dueDay = createdDate.getDate() + Number(remainingDays);
    const dueDateInMs = createdDate.setDate(dueDay);
    
    const timeDiffInMs = dueDateInMs - Date.now();
    const dayInMs = 1000 * 60 * 60 * 24;
    const dayDiff = Math.floor(timeDiffInMs / dayInMs);

    return dayDiff;
}

routes.get('/', (req, res) => {
    const updatedJobs = jobs.map(job => {
        const remaining = remainingDays(job);
        const status = remaining ? 'progress' : 'done';

        return {
            ...job,
            remaining,
            status,
            budget: profile.valueHour * job.totalHours,
        };
    });

    return res.render(views + "index", { jobs: updatedJobs });
})
routes.get('/job', (req, res) => res.render(views + "job"))

routes.post('/job', (req, res) => {
    const lastId = jobs[jobs.length - 1]?.id || 0;
    const body = req.body;

    jobs.push({
        id: lastId + 1,
        name: body.name,
        dailyHours: body["daily-hours"],
        totalHours: body["total-hours"],
        createdAt: Date.now(),
        updatedAt: Date.now(),
    });

    return res.redirect('/');    
})

routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }))

module.exports = routes;