package Misak.CS.ICES4HU.EnrollmentRequest.Repository;

import Misak.CS.ICES4HU.EnrollmentRequest.Entity.EnrollmentRequestEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnrollmentRequestRepository extends JpaRepository<EnrollmentRequestEntity, Long> {
}
