const Database = require('../db/config');

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

    async update(updatedJob, id) {
        const db = await Database();

        await db.run(`
            UPDATE jobs SET 
                name = '${updatedJob.name}',
                daily_hours = ${updatedJob.dailyHours},
                total_hours = ${updatedJob.totalHours},
                updated_at = ${Date.now()}
            WHERE id = ${id}
        `);

        await db.close();
    },

    async delete(id) {
        const db = await Database();

        await db.run(`DELETE FROM jobs WHERE id = ${id}`);

        await db.close();
    }
};
