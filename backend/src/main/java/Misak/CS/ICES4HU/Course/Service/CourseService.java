package Misak.CS.ICES4HU.Course.Service;

import Misak.CS.ICES4HU.Survey.Entity.SurveyEntity;

public interface CourseService {
    SurveyEntity getSurveyById(Long courseId);
    void createSurvey(Long courseId, SurveyEntity survey);
}
