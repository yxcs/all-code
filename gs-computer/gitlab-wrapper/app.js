// var gitlab = require('node-gitlab');

// var client = gitlab.create({
//   api: 'http://192.168.99.68/api/v3',
//   privateToken: 'TEhCvMfysKU4vS3m54KC'
// });

// // client.milestones.list({id: 1}, function (err, milestones) {
// //   console.log(err, milestones);
// // });

// // client.projects.list({}, function (res) {
// //   console.log('--------res---------')
// //   console.log(res)
// // })
// client.milestones.list({}, function (err, milestones) {
//   console.log(err, milestones);
// });

const { Gitlab } = require('gitlab'); // All Resources
const { Projects } = require('gitlab'); // Just the Project Resource
const api = new Gitlab({
  host: 'http://192.168.99.68',
  token: 'TEhCvMfysKU4vS3m54KC',
  version: 3
});

// api.Projects.all().then(projects => {
//   console.log(projects);
// });

api.Users.all().then(res => {
  console.log(res.length)
})

// https://github.com/jdalrymple/gitbeaker
// https://github.com/gitlabhq/gitlabhq/blob/master/doc/api/projects.md
// https://docs.gitlab.com/ee/api/
// https://python-gitlab.readthedocs.io/en/stable/api-usage.html
// https://metacpan.org/pod/GitLab::API::v3#branches