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
    // console.log(post);
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
    NewJobPost.jobPostingArray.push(newJob);
    console.log(NewJobPost.jobPostingArray);
    return NewJobPost.jobPostingArray;
  }
  static arrayPosting() {
    return NewJobPost.jobPostingArray;
  }
}
