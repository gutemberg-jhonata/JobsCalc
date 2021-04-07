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

    async create(newJob) {
        const db = await Database();

        await db.run(`
            INSERT INTO jobs (
                name,
                daily_hours,
                total_hours,
                created_at,
                updated_at
            ) VALUES (
                '${newJob.name}',
                ${newJob.dailyHours},
                ${newJob.totalHours},
                ${newJob.createdAt},
                ${newJob.updatedAt}
            )
        `);

        await db.close();
    },

    update(newJobs) {
        data = newJobs;
    },

    delete(id) {
        data = data.filter(job => Number(job.id) !== Number(id))
    }
};
