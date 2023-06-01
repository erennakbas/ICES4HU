package Misak.CS.ICES4HU.Base.Entity;

import Misak.CS.ICES4HU.Enums.Role;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.util.Date;

@MappedSuperclass
@Data
public class BaseUserEntity implements Serializable {
        @Id
        @Column(nullable = false, unique = true)
        @GeneratedValue(strategy=GenerationType.IDENTITY)
        private Long id;
        @Column(nullable = false, unique = true)
        @Size(min = 8,max = 10, message = "School ID should be between 8 - 10 characters.")
        private String schoolId;
        @Column(nullable = false)
        @Size(min= 2, message = "First name should be longer than 2 characters.")
        private String firstName;
        @Column(nullable = false)
        @Size(min = 2, message = "Last name should be longer than 2 characters.")
        private String lastName;
        @Column(nullable = false, unique = true)
        @Email(message = "Email should be a valid email")
        private String email;
        @Column
        private String department;
        @Column(nullable = false)
        @Size(min = 6, message = "Password should be longer than 6 characters.")
        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
        private String password;
        @Column(nullable = false)
        private Role role;
        @Lob
        @Column
        private byte[] image;
        @Override
        public String toString() {
                return "BaseUserEntity{" +
                        "id=" + id +
                        ", schoolId='" + schoolId + '\'' +
                        ", firstName='" + firstName + '\'' +
                        ", lastName='" + lastName + '\'' +
                        ", email='" + email + '\'' +
                        ", password='" + password + '\'' +
                        ", role=" + role +
                        '}';
        }
}