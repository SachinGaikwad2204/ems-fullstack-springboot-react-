package com.sachin.ems.controller;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.sachin.ems.dto.EmployeeDTO;
import com.sachin.ems.service.EmployeeService;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    // ADD EMPLOYEE WITH RESUME
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EmployeeDTO> addEmployee(
       		@RequestParam("firstName") String firstName,
        	@RequestParam("lastName") String lastName,
        	@RequestParam("email") String email,
        	@RequestParam("department") String department,
        	@RequestParam("salary") Double salary,
        	@RequestParam(value = "profileImage", required = false) MultipartFile profileImage,
        	@RequestParam(value = "resume", required = false) MultipartFile resume
		) throws Exception {

    	EmployeeDTO dto = new EmployeeDTO();
    	dto.setFirstName(firstName);
    	dto.setLastName(lastName);
    	dto.setEmail(email);
    	dto.setDepartment(department);
    	dto.setSalary(salary);

    	EmployeeDTO savedEmployee =
            employeeService.saveEmployee(dto, profileImage, resume);

    	return ResponseEntity.ok(savedEmployee);
	}

    // GET ALL
    @GetMapping
    public List<EmployeeDTO> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    // DOWNLOAD RESUME
    @GetMapping("/{id}/resume")
    public ResponseEntity<Resource> downloadResume(@PathVariable Long id) throws IOException {

        EmployeeDTO employee = employeeService.getEmployeeById(id);

        Path filePath = Paths.get("uploads/resumes/" + employee.getResumeName());
        Resource resource = new UrlResource(filePath.toUri());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + employee.getResumeName() + "\"")
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok("Employee Deleted");
    }
}
