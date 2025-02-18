export default class NewJobPost {
  static jobPostingArray = [];
  constructor(
    role,
    designation,
    location,
    companyName,
    salary,
    jobopening,
    dob
  ) {
    this.role = role;
    this.designation = designation;
    this.location = location;
    this.companyName = companyName;
    this.salary = salary;
    this.jobopening = jobopening;
    this.dob = dob;
  }
  static newJobPost(post) {
    const {
      role,
      designation,
      location,
      companyName,
      salary,
      jobopening,
      dob,
    } = post;
    const newJob = new NewJobPost(
      role,
      designation,
      location,
      companyName,
      salary,
      jobopening,
      dob
    );
    arrayPosting(post);
    NewJobPost.arrayPosting(post);
    NewJobPost.jobPostingArray.push(newJob);
    // console.log(NewJobPost.jobPostingArray);
    return newJob;
  }
  static arrayPosting(post) {
    NewJobPost.jobPostingArray.push(post);
    console.log(NewJobPost.jobPostingArray);
    return NewJobPost.jobPostingArray;
  }
}
