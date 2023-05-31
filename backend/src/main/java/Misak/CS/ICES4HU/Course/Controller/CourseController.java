package Misak.CS.ICES4HU.Course.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import Misak.CS.ICES4HU.Course.Service.CourseService;
import Misak.CS.ICES4HU.Survey.Entity.SurveyEntity;

@RestController
@RequestMapping(path="/api/courses")
public class CourseController {
    @Autowired
    CourseService courseService;

    @GetMapping(path="/survey/{courseId}")
    public ResponseEntity<SurveyEntity> getSurvey(@PathVariable Long courseId){
        SurveyEntity returnObject= courseService.getSurveyById(courseId);
        return new ResponseEntity<>(returnObject, HttpStatusCode.valueOf(200));

    }

    @PostMapping(path="/survey/{courseId}")
    public ResponseEntity<String> createSurvey(@PathVariable Long courseId, @RequestBody SurveyEntity survey){
        courseService.createSurvey(courseId, survey);
        return new ResponseEntity<>("Survey is succesfully created", HttpStatusCode.valueOf(200));

    }
    
}
