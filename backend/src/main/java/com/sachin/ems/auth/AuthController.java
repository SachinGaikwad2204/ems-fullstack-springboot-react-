package com.sachin.ems.auth;

import com.sachin.ems.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;
      
       @Autowired
private org.springframework.security.crypto.password.PasswordEncoder encoder;

@GetMapping("/encode")
public String encodePassword(@RequestParam String password) {
    return encoder.encode(password);
}



    @PostMapping("/login")
    public Map<String, String> login(@RequestBody User loginRequest) {

        User user = userRepository
                .findByUsername(loginRequest.getUsername())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

if (!encoder.matches(
        loginRequest.getPassword(),
        user.getPassword())) {

    throw new RuntimeException("Invalid password");
}             

        String token = jwtUtil.generateToken(user.getUsername());

        return Map.of("token", token);
    }
}
