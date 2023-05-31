package Misak.CS.ICES4HU.Course.Service.impl;

import Misak.CS.ICES4HU.Course.Repository.CourseRepository;
import Misak.CS.ICES4HU.Course.Service.CourseService;
import Misak.CS.ICES4HU.Survey.Entity.SurveyEntity;
import lombok.AllArgsConstructor;
import Misak.CS.ICES4HU.Course.Entity.CourseEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseServiceImpl implements CourseService {
    @Autowired
    CourseRepository courseRepository;

    public SurveyEntity getSurveyById(Long courseId){

        return courseRepository.findCourseEntityById(courseId).getSurveyEntity();
    }

    public void createSurvey(Long courseId, SurveyEntity survey){
        CourseEntity course = courseRepository.findCourseEntityById(courseId);
        course.setSurveyEntity(survey);
        courseRepository.save(course);
    }
}
