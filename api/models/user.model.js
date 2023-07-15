const Status = {
  VERIFIED: "verified",
  UNVERIFIED: "unverified",
};

class User {
  constructor(
    id,
    firstname,
    lastname,
    description,
    email,
    country,
    phoneNumber,
    profilePic,
    status = Status.UNVERIFIED // Default value is UNVERIFIED
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.country = country;
    this.phoneNumber = phoneNumber;
    this.profilePic = profilePic;
    this.description = description;
    this.status = status;
    this.courses = []; // Array to store courses associated with this user
  }
}

module.exports = User;
