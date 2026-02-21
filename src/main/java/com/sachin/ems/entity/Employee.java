package com.sachin.ems.entity;

import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name required")
private String firstName;

@NotBlank(message = "Last name required")
private String lastName;

@Email(message = "Invalid email")
@NotBlank(message = "Email required")
private String email;

@NotBlank(message = "Department required")
private String department;

@NotNull(message = "Salary required")
private Double salary;

@Column(name = "profile_image")
private String profileImage;

@Column(name = "resume")
private String resume;

}
