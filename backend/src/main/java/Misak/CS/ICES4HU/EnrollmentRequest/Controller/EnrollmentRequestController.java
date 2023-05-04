package Misak.CS.ICES4HU.EnrollmentRequest.Controller;

import Misak.CS.ICES4HU.EnrollmentRequest.Entity.EnrollmentRequestEntity;
import Misak.CS.ICES4HU.EnrollmentRequest.Service.EnrollmentRequestService;
import Misak.CS.ICES4HU.Enums.Role;
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

    @PutMapping(path="/accept")
    public ResponseEntity<String> acceptEnrollmentRequestList(@Valid @RequestBody Iterable<EnrollmentRequestEntity> enrollmentRequests){
        System.out.println("Accepting enrollment request");
        enrollmentRequestService.acceptEnrollmentRequest(enrollmentRequests);
        return new ResponseEntity<>("Enrollment Requests are succesfully accepted", HttpStatusCode.valueOf(200));
    }

    @PutMapping(path="/reject")
    public ResponseEntity<String> rejectEnrollmentRequestList(@Valid @RequestBody Iterable<EnrollmentRequestEntity> enrollmentRequests){
        System.out.println("Rejecting enrollment request");
        enrollmentRequestService.rejectEnrollmentRequest(enrollmentRequests);
        return new ResponseEntity<>("Enrollment Requests are succesfully rejected", HttpStatusCode.valueOf(200));
    }

    @GetMapping(path = "")
    public ResponseEntity<Iterable<EnrollmentRequestEntity>> getEnrollmentRequests(){
        System.out.println("Getting enrollment requests");
        Iterable<EnrollmentRequestEntity> returnObject= enrollmentRequestService.getEnrollmentRequests();
        return new ResponseEntity<>(returnObject, HttpStatusCode.valueOf(200));
    }
}
