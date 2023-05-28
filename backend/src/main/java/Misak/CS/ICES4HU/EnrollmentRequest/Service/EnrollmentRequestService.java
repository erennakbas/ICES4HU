package Misak.CS.ICES4HU.EnrollmentRequest.Service;

import Misak.CS.ICES4HU.EnrollmentRequest.Entity.EnrollmentRequestEntity;

public interface EnrollmentRequestService {
    EnrollmentRequestEntity createEnrollment(EnrollmentRequestEntity enrollmentRequest);
    void acceptEnrollmentRequest(Iterable<Long> enrollmentRequestIDs);
    void rejectEnrollmentRequest(Iterable<Long> enrollmentRequestIDs);
    Iterable<EnrollmentRequestEntity> getEnrollmentRequests();
}
