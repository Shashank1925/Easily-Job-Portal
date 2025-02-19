import session from "express-session";
import RegisterRecruiterData from "../model/register-recruiterModel.js";
import NewJobPost from "../model/recruiter.newJobPost.Model.js";
  const recruiterData = RegisterRecruiterData.getRecruiterList();
// const jobPosted = NewJobPost.arrayPosting();

export default class HomepageController {
  // this method is for rendering the homepage
  static getHomepage(req, res) {
    res.render("homePage", {
      body: "main",
      session: req.session.user,
    });
  }
  // here this method is for rendering the job posting page
  static getJobPage(req, res) {
    const allJobs=NewJobPost.getAllJobs();
    res.render("homePage", { body: "jobsPosting" ,posts:allJobs, error: allJobs.length===0 ? "no job posted" : null  });
  }
  // this method is for rendering the registration form
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
  // this method is for rendering the login form after clicking on login button which is below registration form
  static getLoginPage1(req, res) {
    res.render("homePage", {
      body: "recruiter-loginForm",
    });
  }
  static getRecruiterJobPostingPage(req, res) {
    const userData = recruiterData.find(
      (recruiter) => recruiter.email === req.body.email
    );
    if (!userData) {
      return res.status(401).send("User not found");
  }
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
    const skills = ["React", "JavaScript", "HTML", "CSS", "Node.js", "MongoDB", "Express.js"];
    if (req.session.user) {
      res.render("homePage", {
        body: "newPostJobs",
        skills: skills,
        session: req.session.user,
      });
    }
    else {
      res.redirect("/");
    }
  }
  // here method of posting new job after filling the new job posting form
  static postNewJob(req, res) {
    if(!req.session.user) {
      return res.redirect("/login");
    }
    NewJobPost.newJobPost(req.body);
     const allJobs=NewJobPost.getAllJobs();

     res.render("homePage", { body: "jobsPosting", session: req.session.user || {}, posts:allJobs, error: allJobs.length===0 ? "no job posted" : null });
  }
  
}
