package Misak.CS.ICES4HU.EnrollmentRequest.Service.impl;

import Misak.CS.ICES4HU.EnrollmentRequest.Entity.EnrollmentRequestEntity;
import Misak.CS.ICES4HU.EnrollmentRequest.Repository.EnrollmentRequestRepository;
import Misak.CS.ICES4HU.EnrollmentRequest.Service.EnrollmentRequestService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EnrollmentRequestServiceImpl implements EnrollmentRequestService {
    private EnrollmentRequestRepository repository;
    public EnrollmentRequestEntity createEnrollment(EnrollmentRequestEntity enrollmentRequest){
        return repository.save(enrollmentRequest);
    }
}
