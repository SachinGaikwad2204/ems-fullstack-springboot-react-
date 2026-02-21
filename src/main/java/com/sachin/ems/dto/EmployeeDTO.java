package com.sachin.ems.dto;

import org.springframework.web.multipart.MultipartFile;

public class EmployeeDTO {

private Long id;
private String firstName;
private String lastName;
private String email;
private String department;
private Double salary;

private MultipartFile profileImage;
private MultipartFile resume;

private String profileImageName;
private String resumeName;

private String resumePath;

public Long getId() { return id; }
public void setId(Long id) { this.id = id; }

public String getFirstName() { return firstName; }
public void setFirstName(String firstName) { this.firstName = firstName; }

public String getLastName() { return lastName; }
public void setLastName(String lastName) { this.lastName = lastName; }

public String getEmail() { return email; }
public void setEmail(String email) { this.email = email; }

public String getDepartment() { return department; }
public void setDepartment(String department) { this.department = department; }

public Double getSalary() { return salary; }
public void setSalary(Double salary) { this.salary = salary; }

public MultipartFile getProfileImage() { return profileImage; }
public void setProfileImage(MultipartFile profileImage) { this.profileImage = profileImage; }

public MultipartFile getResume() { return resume; }
public void setResume(MultipartFile resume) { this.resume = resume; }

public String getProfileImageName() { return profileImageName; }
public void setProfileImageName(String profileImageName) { this.profileImageName = profileImageName; }

public String getResumeName() { return resumeName; }
public void setResumeName(String resumeName) { this.resumeName = resumeName; }

public String getResumePath() {
    return resumePath;
}

public void setResumePath(String resumePath) {
    this.resumePath = resumePath;
}


}
