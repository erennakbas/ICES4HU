package Misak.CS.ICES4HU.Course.Service.impl;

import Misak.CS.ICES4HU.Course.Repository.CourseRepository;
import Misak.CS.ICES4HU.Course.Service.CourseService;
import Misak.CS.ICES4HU.Question.Entity.QuestionEntity;
import Misak.CS.ICES4HU.Question.Repository.QuestionRepository;
import Misak.CS.ICES4HU.Survey.Entity.SurveyEntity;
import Misak.CS.ICES4HU.Survey.Repository.SurveyRepository;
import lombok.AllArgsConstructor;
import Misak.CS.ICES4HU.Course.Entity.CourseEntity;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseServiceImpl implements CourseService {
    @Autowired
    CourseRepository courseRepository;

    @Autowired
    SurveyRepository surveyRepository;

    @Autowired
    QuestionRepository questionRepository;

    public SurveyEntity getSurveyById(Long courseId){

        return courseRepository.findCourseEntityById(courseId).getSurveyEntity();
    }

    public void createSurvey(Long courseId, SurveyEntity survey){   
        CourseEntity course = courseRepository.findCourseEntityById(courseId);
        SurveyEntity surveyEntity = new SurveyEntity();
        List<QuestionEntity> questions = new ArrayList<>(); 
        for(QuestionEntity question: survey.getQuestions()){
            QuestionEntity newQuestion = new QuestionEntity();
            newQuestion.setQuestion(question.getQuestion());
            newQuestion.setType(question.getType());
            newQuestion.setAnswer(question.getAnswer());
            questionRepository.save(newQuestion);
            questions.add(newQuestion);
        }

        surveyEntity.setQuestions(questions);
        surveyRepository.save(surveyEntity);
        course.setSurveyEntity(surveyEntity);
        courseRepository.save(course);
    }
}
