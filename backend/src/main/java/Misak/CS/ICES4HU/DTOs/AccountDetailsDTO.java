package Misak.CS.ICES4HU.DTOs;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AccountDetailsDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
}
