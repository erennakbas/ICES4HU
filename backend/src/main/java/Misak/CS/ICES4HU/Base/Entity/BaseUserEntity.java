package Misak.CS.ICES4HU.Base.Entity;

import Misak.CS.ICES4HU.Enums.Role;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

@MappedSuperclass
@Data
@ToString
public class BaseUserEntity implements Serializable {
        @Id
        @Column(nullable = false, unique = true)
        private Long id;
        @Column(nullable = false)
        @Min(value = 2, message = "First name should be longer than 2 characters.")
        private String firstName;
        @Column(nullable = false)
        @Min(value = 2, message = "Last name should be longer than 2 characters.")
        private String lastName;
        @Column(nullable = false, unique = true)
        @Email(message = "Email should be a valid email")
        private String email;
        @Column(nullable = false)
        @Min(value = 6, message = "Password should be longer than 6 characters.")
        private String password;
        @Column(nullable = false)
        private Role role;
}