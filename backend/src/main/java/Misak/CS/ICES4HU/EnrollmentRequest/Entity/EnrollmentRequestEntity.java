package Misak.CS.ICES4HU.EnrollmentRequest.Entity;

import Misak.CS.ICES4HU.Base.Entity.BaseUserEntity;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity(name="enrollment_requests")
public class EnrollmentRequestEntity extends BaseUserEntity {
}