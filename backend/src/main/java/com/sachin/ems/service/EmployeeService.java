package com.sachin.ems.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.sachin.ems.dto.EmployeeDTO;

public interface EmployeeService {

    List<EmployeeDTO> getAllEmployees();

    EmployeeDTO getEmployeeById(Long id);

    EmployeeDTO saveEmployee(EmployeeDTO dto,MultipartFile profileImage,MultipartFile resume) throws Exception;

    EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO);

    void deleteEmployee(Long id);
}
