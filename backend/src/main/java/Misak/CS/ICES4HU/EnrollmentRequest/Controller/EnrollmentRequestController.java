package Misak.CS.ICES4HU.EnrollmentRequest.Controller;

import Misak.CS.ICES4HU.EnrollmentRequest.Entity.EnrollmentRequestEntity;
import Misak.CS.ICES4HU.EnrollmentRequest.Service.EnrollmentRequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController

@RequestMapping(path="/api/enrollment_requests")
public class EnrollmentRequestController {
    @Autowired
    private EnrollmentRequestService enrollmentRequestService;
    @PostMapping(path="/signup")
    public ResponseEntity<EnrollmentRequestEntity> signup(@Valid @RequestBody EnrollmentRequestEntity enrollmentRequest){
        EnrollmentRequestEntity returnObject= enrollmentRequestService.createEnrollment(enrollmentRequest);
        return new ResponseEntity<>(returnObject, HttpStatusCode.valueOf(200));
    }

}
