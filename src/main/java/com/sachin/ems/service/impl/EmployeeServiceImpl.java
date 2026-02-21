package com.sachin.ems.service.impl;

import java.nio.file.*;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sachin.ems.dto.EmployeeDTO;
import com.sachin.ems.entity.Employee;
import com.sachin.ems.repository.EmployeeRepository;
import com.sachin.ems.service.EmployeeService;


@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    private final String UPLOAD_DIR = "uploads/resumes/";

@Override
public EmployeeDTO saveEmployee(EmployeeDTO dto,
                                MultipartFile profileImage,
                                MultipartFile resume) throws Exception {

    Path imageDir = Paths.get("uploads/images/");
    Path resumeDir = Paths.get("uploads/resumes/");

    if (!Files.exists(imageDir)) {
        Files.createDirectories(imageDir);
    }

    if (!Files.exists(resumeDir)) {
        Files.createDirectories(resumeDir);
    }

    // SAVE IMAGE
    if (profileImage != null && !profileImage.isEmpty()) {

String originalName = profileImage.getOriginalFilename();
String cleanName = originalName.replaceAll("\\s+", "_");
String imageName = System.currentTimeMillis() + "_" + cleanName;

        Files.copy(profileImage.getInputStream(),
                imageDir.resolve(imageName),
                StandardCopyOption.REPLACE_EXISTING);

        dto.setProfileImageName(imageName);
    }

    // SAVE RESUME
    if (resume != null && !resume.isEmpty()) {

String originalResume = resume.getOriginalFilename();
String cleanResume = originalResume.replaceAll("\\s+", "_");
String resumeName = System.currentTimeMillis() + "_" + cleanResume;

        Files.copy(resume.getInputStream(),
                resumeDir.resolve(resumeName),
                StandardCopyOption.REPLACE_EXISTING);

        dto.setResumeName(resumeName);
    }

    Employee employee = mapToEntity(dto);

Employee saved = employeeRepository.save(employee);
    return mapToDTO(saved);
}

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDTO getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .map(this::mapToDTO)
                .orElse(null);
    }

    @Override
    public EmployeeDTO updateEmployee(Long id, EmployeeDTO dto) {

        Employee employee = employeeRepository.findById(id).orElse(null);

        if (employee != null) {
            employee.setFirstName(dto.getFirstName());
            employee.setLastName(dto.getLastName());
            employee.setEmail(dto.getEmail());
            employee.setDepartment(dto.getDepartment());
            employee.setSalary(dto.getSalary());
        }

        Employee updated = employeeRepository.save(employee);
        return mapToDTO(updated);
    }

    @Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

private EmployeeDTO mapToDTO(Employee emp) {
    EmployeeDTO dto = new EmployeeDTO();

    dto.setId(emp.getId());
    dto.setFirstName(emp.getFirstName());
    dto.setLastName(emp.getLastName());
    dto.setEmail(emp.getEmail());
    dto.setDepartment(emp.getDepartment());
    dto.setSalary(emp.getSalary());

    // 🔥 ADD THESE TWO LINES
    dto.setProfileImageName(emp.getProfileImage());
    dto.setResumeName(emp.getResume());

    return dto;
}

    private Employee mapToEntity(EmployeeDTO dto) {
        Employee emp = new Employee();
        emp.setId(dto.getId());
        emp.setFirstName(dto.getFirstName());
        emp.setLastName(dto.getLastName());
        emp.setEmail(dto.getEmail());
        emp.setDepartment(dto.getDepartment());
        emp.setSalary(dto.getSalary());
	emp.setProfileImage(dto.getProfileImageName());
	emp.setResume(dto.getResumeName());

        return emp;
    }
}
