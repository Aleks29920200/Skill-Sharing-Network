package com.example.skillsh.domain.dto.user;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
public class AddUserDTO {
    private Long id;
    private String username;
    private String email;
    private String firstName;
    private String password;
    private String lastName;
    private String address;
    private String bio;
    private String activity;
    private MultipartFile photoUrl;
}
