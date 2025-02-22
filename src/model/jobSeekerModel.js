import { v4 as uuidv4 } from "uuid";
export default class RegistrationJobSeeker{
    static jobSeekerRegistrationArray = [];
    constructor(id, name, email,contact,resume,jobId) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.contact =contact;
        this.resume =resume;
        this.jobId = jobId;
      }
      static jobSeekerRegistrationData(information){
        if (!information?.name || !information?.email || !information?.contact || !information?.resume) {
            throw new Error(
              "Invalid recruiter data! name, email, contact and resume are required."
            );
          }
          const { name, email, contact,resume,jobId } = information;
          const id = uuidv4();
          const newJobSeeker = new RegistrationJobSeeker(id, name, email,contact,resume,jobId);
          RegistrationJobSeeker.jobSeekerRegistrationArray.push(newJobSeeker);
          console.log(RegistrationJobSeeker.jobSeekerRegistrationArray); // Debugging output
          console.log("---------------------------------------------------------");
          return RegistrationJobSeeker.jobSeekerRegistrationArray;
        }
        static getJobSeekerList(jobId) {
          console.log(RegistrationJobSeeker.jobSeekerRegistrationArray); // Debugging output
          console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\");
          if (jobId) {
             return RegistrationJobSeeker.jobSeekerRegistrationArray.filter(jobSeeker => jobSeeker.jobId === jobId);
        }
         return RegistrationJobSeeker.jobSeekerRegistrationArray; //  Static property correctly accessed
      }
       
}