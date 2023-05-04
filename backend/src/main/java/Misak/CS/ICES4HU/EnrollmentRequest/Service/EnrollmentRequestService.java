package Misak.CS.ICES4HU.EnrollmentRequest.Service;

import Misak.CS.ICES4HU.EnrollmentRequest.Entity.EnrollmentRequestEntity;

public interface EnrollmentRequestService {
    EnrollmentRequestEntity createEnrollment(EnrollmentRequestEntity enrollmentRequest);
    EnrollmentRequestEntity acceptEnrollmentRequest(EnrollmentRequestEntity enrollmentRequest);
    void rejectEnrollmentRequest(EnrollmentRequestEntity enrollmentRequest);
    Iterable<EnrollmentRequestEntity> getEnrollmentRequests();
}
