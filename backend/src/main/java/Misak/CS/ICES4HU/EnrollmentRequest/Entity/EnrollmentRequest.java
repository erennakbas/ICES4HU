package Misak.CS.ICES4HU.EnrollmentRequest.Entity;

import Misak.CS.ICES4HU.Base.Entity.BaseUserEntity;
import Misak.CS.ICES4HU.Enums.Role;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
@Entity(name="enrollment_requests")
public class EnrollmentRequest extends BaseUserEntity {
}