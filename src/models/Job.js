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
    get() {
        return data;
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
