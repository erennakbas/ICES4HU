package Misak.CS.ICES4HU.EnrollmentRequest.Service;

import Misak.CS.ICES4HU.EnrollmentRequest.Entity.EnrollmentRequestEntity;

public interface EnrollmentRequestService {
    EnrollmentRequestEntity createEnrollment(EnrollmentRequestEntity enrollmentRequest);
    void acceptEnrollmentRequest(Iterable<EnrollmentRequestEntity> enrollmentRequests);
    void rejectEnrollmentRequest(Iterable<EnrollmentRequestEntity> enrollmentRequests);
    Iterable<EnrollmentRequestEntity> getEnrollmentRequests();
}
