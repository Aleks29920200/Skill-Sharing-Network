package com.example.skillsh.domain.view;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserView {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
}
