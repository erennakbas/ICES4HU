package Misak.CS.ICES4HU.DTOs;

import lombok.Data;

@Data
public class PasswordDTO {
    private Long id;
    private String password;
    private String confirmPassword;
}
