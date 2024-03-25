package com.example.skillsh.domain.dto;

import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDto {
    @Length(min=5,max=25)
    private String username;
    @Length(min=5)
    private String password;
    @Email
    private String email;
    @Length(min=5,max=25)
    private String firstName;
    @Length(min=5,max=25)
    private String lastName;
    private String categoryOfSkill;
}
