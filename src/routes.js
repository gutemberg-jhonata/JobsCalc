const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/";

const Profile = {
    data: {
        name: "Jhonata Gutemberg",
        avatar: "http://github.com/gutemberg-jhonata.png",
        monthlyBudget: 3000,
        hoursPerDay: 5,
        daysPerWeek: 5,
        vacationPerYear: 4,
        valueHour: 4,
    },

    controllers: {
        index(req, res) {
            return res.render(views + "profile", { profile: Profile.data });
        },

        update(req, res) {
            const data = Profile.data;

            const weekPerYear = 52;
            const weekPerMonth = (weekPerYear - data.vacationPerYear) / 12;
            const weekTotalHours = data.hoursPerDay * data.daysPerWeek;
            const monthlyTotalHours = weekTotalHours * weekPerMonth;
            const valueHour = data.monthlyBudget / monthlyTotalHours;
            
            Profile.data = {
                ...Profile.data,
                ...req.body,
                valueHour
            }

            return res.redirect('/profile');
        }
    }
}

const Job = {
    data: [
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
            totalHours: 3,
            budget: 45000,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }
    ],

    controllers: {
        index(req, res) {
            const updatedJobs = Job.data.map(job => {
                const remaining = Job.services.remainingDays(job);
                const status = remaining > 0 ? 'progress' : 'done';
        
                return {
                    ...job,
                    remaining,
                    status,
                    budget: Profile.data.valueHour * job.totalHours,
                };
            });
        
            return res.render(views + "index", { jobs: updatedJobs });
        },

        create(req, res) {
            return res.render(views + "job")
        },

        save(req, res) {
            const lastId = Job.data[Job.data.length - 1]?.id || 0;
            const body = req.body;
        
            Job.data.push({
                id: lastId + 1,
                name: body.name,
                dailyHours: body["daily-hours"],
                totalHours: body["total-hours"],
                createdAt: Date.now(),
                updatedAt: Date.now(),
            });
        
            return res.redirect('/');    
        }
    },

    services: {
        remainingDays(job) {
            const remainingDays = (job.totalHours / job.dailyHours).toFixed();
                
            const createdDate = new Date(job.createdAt);
            const dueDay = createdDate.getDate() + Number(remainingDays);
            const dueDateInMs = createdDate.setDate(dueDay);
            
            const timeDiffInMs = dueDateInMs - Date.now();
            const dayInMs = 1000 * 60 * 60 * 24;
            const dayDiff = Math.floor(timeDiffInMs / dayInMs);
        
            return dayDiff;
        },
    }
}

routes.get('/', Job.controllers.index)

routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))

routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

module.exports = routes;