 import RegisterRecruiterData from "../model/register-recruiterModel.js";
import RegistrationJobSeeker from "../model/jobSeekerModel.js";
import NewJobPost from "../model/recruiter.newJobPost.Model.js";
   const recruiterData = RegisterRecruiterData.getRecruiterList();
// const jobPosted = NewJobPost.arrayPosting();

export default class HomepageController {
  // this method is for rendering the homepage
  static getHomepage(req, res) {
     const allJobs = NewJobPost.getAllJobs();

     res.render("homePage", {
      body: "main",
      session: req.session.user,
       allJobs,
    });
  }
  // here this method is for rendering the job posting page
  static getJobPage(req, res) {
  const allJobs = NewJobPost.getAllJobs();
  let page = parseInt(req.query.page) || 1;
  let perPage = 3;
  
  let totalPages = Math.ceil(allJobs.length / perPage);
  let paginatedJobs = allJobs.slice((page - 1) * perPage, page * perPage);

    res.render("homePage", {
      body: "jobsPosting",
      session: req.session.user || {},
      posts: paginatedJobs,
      page,
      totalPages,
      pageUrl: "/jobPosting",  
      error: allJobs.length === 0 ? "No job posted" : null,
    });
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
    console.log("/////////////////////////////////////////////////////////")
    console.log(req.body);
    const { name, email } = req.body;
    req.session.user = {
      name: name,
      email: email,
       role: "recruiter",
    };
    console.log(req.session.user);
    res.redirect("/");
  }
  // this method is for getting the new job posting form
  static getPostJobForm(req, res) {
    const skills = ["React", "JavaScript", "HTML", "CSS", "Node.js", "MongoDB", "Express.js","Bootstrap"];
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
    // console.log(req.body);
    let selectedSkills = [];
    try {
        selectedSkills = JSON.parse(req.body.skills || "[]");
    } catch (error) {
        console.error("Error parsing skills:", error);
    }
    const jobPosted = NewJobPost.newJobPost({ ...req.body, skills: selectedSkills });
    const totalPosts = jobPosted.filter(
      (job) =>
        job.companyName === req.body.companyName &&
        job.designation === req.body.designation
    );
     const allJobs=NewJobPost.getAllJobs();
     if (!allJobs || allJobs.length === 0) {
      return res.render("homePage", {
          body: "jobsPosting",
          session: req.session.user || {},
          posts: [],
          page: 1,
          totalPages: 1,
          error: "No job posted yet"
      });
  }
    //  console.log(allJobs);
      if (!totalPosts || totalPosts.length === 0) {
      return res.status(404).send("Job not found");
    }

    let page = parseInt(req.query.page) || 1;
    let perPage = 3; // 5 jobs per page
    let totalPages = Math.ceil(allJobs.length / perPage);
    let paginatedJobs = allJobs.slice((page - 1) * perPage, page * perPage);

    res.render("homePage", {
        body: "jobsPosting",
        session: req.session.user || {},
        posts: paginatedJobs,
        page,
        totalPages,
        pageUrl: "/jobPosting",
        error: null
    });
  }
  static detailsOfJob(req, res) {
    // this is for getting all applied applicants for a particular job 
    let count= RegistrationJobSeeker.getJobSeekerList();
    // it removes the duplicates from the array of objects 
    count = [...new Map(count.map(item => [`${item.email}-${item.contact}`, item])).values()];

    const jobId = req.params.id;
    const allJobs = NewJobPost.getAllJobs();
    const job = allJobs.find((j) => j.id == jobId);
    if(!req.session.user) {
    return   res.render("homePage",{ body:"details-Job",session: null,job,count, error: allJobs.length === 0 ? "No job posted" : null});
 }
else{
    console.log("Job ID:////////////////", jobId);
    if (!jobId) {
        return res.status(400).send("Invalid request! Job ID is required.");
    }

    console.log("Fetching Job Details for ID:", jobId);

    console.log("All Jobs Available:", allJobs);

    // Ensure the ID comparison works correctly

    if (!job) {
        return res.status(404).send("Job not found");
    }

    console.log("Job Found:", job);
    console.log("Session User:", req.session.user);
    res.render("homePage", { 
        body: "details-Job", 
        session: req.session.user || {}, 
        job: job,
        count,
        error: allJobs.length === 0 ? "No job posted" : null
    })};
}
 
// this method is for deleting the posted job 
  static deleteJob(req, res) {
    if (!req.session.user) {
      return res.redirect("/login");
    }
  const jobId = req.params.id;
  
  NewJobPost.jobPostingArray = NewJobPost.jobPostingArray.filter(job => job.id !== jobId);
  const job = NewJobPost.getAllJobs().find((j) => j.id === jobId);

  // this allJobs should be below NewJobPost.jobPostingArray, otherwise it has to click twice as on one click it will delete but alljobs will update the older list and then on second click it will delete the job
  const allJobs=NewJobPost.getAllJobs();
// Redirect to homepage after deletion
res.render("homePage", { 
  body: "jobsPosting", 
  session: req.session.user || {}, 
  posts:allJobs,
  job,
  error: allJobs.length===0 ? "no job posted" : null
}); 
  }
  // here is the method for editing the job posting form 
  static editJob(req, res) {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    const jobId = req.params.id;
    const job = NewJobPost.getAllJobs().find(job => job.id === jobId);

    if (!job) {
        return res.status(404).send("Job Not Found");
    }
    const skillsList = ["React", "JavaScript", "HTML", "CSS", "Node.js", "MongoDB", "Express.js", "Bootstrap"];

    res.render("homePage", { body: "update-JobForm", session: req.session.user, job, skillsList });
}
// this is to update the job posting form 
static updateJob(req, res) {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  const jobId = req.params.id;  // Find Job by ID
  const jobIndex = NewJobPost.jobPostingArray.findIndex(job => job.id === jobId);

  if (jobIndex === -1) {
    return res.status(404).send("Job not found");
  }

  // Parse selected skills
  let selectedSkills = [];
  try {
    selectedSkills = JSON.parse(req.body.skills || "[]");
  } catch (error) {
    console.error("Error parsing skills:", error);
  }

  // Update existing job, instead of creating a new one
  NewJobPost.jobPostingArray[jobIndex] = {
    ...NewJobPost.jobPostingArray[jobIndex],
    role: req.body.role,
    designation: req.body.designation,
    location: req.body.location,
    companyName: req.body.companyName,
    salary: req.body.salary,
    jobopening: req.body.jobopening,
    dob: req.body.dob,
    skills: selectedSkills,  // Update skills correctly
  };

  // console.log("Updated Job:", NewJobPost.jobPostingArray[jobIndex]);

  //  Render updated job postings
  const allJobs = NewJobPost.getAllJobs();
  res.render("homePage", { 
    body: "jobsPosting", 
    session: req.session.user || {}, 
    posts: allJobs, 
    error: allJobs.length === 0 ? "No job posted" : null 
  });
}
// this is the method of job seeker registration form 
static jobSeekerRegistrationForm(req, res) {
  if (!req.session.user) {
    return  res.render("homePage", { body: "jobSeekerRegistrationForm" });
   }
}
static getApplyConfirmation(req, res) {
  console.log(req.body);
  RegistrationJobSeeker.jobSeekerRegistrationData(req.body);
   // this is for getting all applied applicants for a particular job 
   let count= RegistrationJobSeeker.getJobSeekerList();
   // it removes the duplicates from the array of objects 
   const seen = new Set();
    const uniqueJobSeekers = count.map(jobSeeker => {
        const key = `${jobSeeker.email}-${jobSeeker.contact}`;
        if (seen.has(key)) {
            return { ...jobSeeker, alreadyApplied: true };
        } else {
            seen.add(key);
            return { ...jobSeeker, alreadyApplied: false };
        }
    });
   res.render("homePage", {
    body: "applyConfirmation",
    jobSeekers: uniqueJobSeekers,
  });
}
}