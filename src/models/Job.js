const Database = require('../db/config');

let data = [
    {
        id: 1,
        name: "Pizzaria Guloso",
        dailyHours: 2,
        totalHours: 40,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    },
    {
        id: 2,
        name: "OneTwo Project",
        dailyHours: 3,
        totalHours: 3,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    }
];

module.exports = {
    async get() {
        const db = await Database();

        const jobs = await db.all(`SELECT * FROM jobs`);

        await db.close();

        return jobs.map(job => ({
            id: job.id,
            name: job.name,
            dailyHours: job.daily_hours,
            totalHours: job.total_hours,
            createdAt: job.created_at,
            updatedAt: job.updated_at
        }));
    },

    create(newJob) {
        data.push(newJob);
    },

    update(newJobs) {
        data = newJobs;
    },

    delete(id) {
        data = data.filter(job => Number(job.id) !== Number(id))
    }
};
