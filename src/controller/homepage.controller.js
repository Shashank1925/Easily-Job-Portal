import session from "express-session";
import RegisterRecruiterData from "../model/register-recruiterModel.js";
const recruiterData = RegisterRecruiterData.getRecruiterList();

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
      // user: req.session.user,
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
      // user: req.session.user,
    });
  }
  static getRecruiterJobPostingPage(req, res) {
    const userData = recruiterData.find(
      (recruiter) => recruiter.email === req.body.email
    );
    Object.assign(req.body, userData);
    req.session.user = {
      name: req.body.name,
      email: req.body.email,
    };
    res.render("homePage", {
      body: "jobsPosting",
      // user: req.session.user,
    });
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
    res.render("homePage", { body: "jobsPosting", session: req.session.user });
  }
}
