import session from "express-session";
import RegisterRecruiterData from "../model/register-recruiterModel.js";
import NewJobPost from "../model/recruiter.newJobPost.Model.js";
const recruiterData = RegisterRecruiterData.getRecruiterList();
const jobPosted = NewJobPost.arrayPosting();

export default class HomepageController {
  static getHomepage(req, res) {
    res.render("homePage", {
      body: "main",
      session: req.session.user,
    });
  }
  // here this method is for rendering the job posting page
  static getJobPage(req, res) {
    res.render("homePage", { body: "jobsPosting" });
  }
  static getRegisterPage(req, res) {
    res.render("homePage", {
      body: "recruiter-registrationForm",
    });
  }
  // this method is for rendering login form after submitting the registration form
  static getLoginPage(req, res) {
    RegisterRecruiterData.getRegisterRecruiterData(req.body);
    res.render("homePage", {
      body: "confirmation",
    });
  }
  static getLoginPage1(req, res) {
    res.render("homePage", {
      body: "recruiter-loginForm",
    });
  }
  static getRecruiterJobPostingPage(req, res) {
    const userData = recruiterData.find(
      (recruiter) => recruiter.email === req.body.email
    );
    Object.assign(req.body, userData);
    const { name, email } = req.body;
    req.session.user = {
      name: name,
      email: email,
    };
    res.redirect("/jobPosting");
  }
  // this method is for getting the new job posting form
  static getPostJobForm(req, res) {
    if (session) {
      res.render("homePage", {
        body: "newPostJobs",
        session: req.session.user,
      });
    }
  }
  // here method of posting new job
  static postNewJob(req, res) {
    NewJobPost.newJobPost(req.body);
    res.render("homePage", { body: "jobsPosting", session: req.session.user });
  }

  static viewJobDetails(req, res) {
    if (!req.session.user) {
      return res.redirect("/login");
    }
    console.log(req.body);
    // console.log(jobPosted);

    const totalPosts = jobPosted.find(
      (job) =>
        job.companyName === req.body.companyName &&
        job.designation === req.body.designation
    );
    console.log(totalPosts);
    if (!totalPosts) {
      return res.status(404).send("Job not found");
    }

    console.log(totalPosts);
    res.render("homePage", {
      body: "jobsPosting",
      post: totalPosts,
    });
  }
}
