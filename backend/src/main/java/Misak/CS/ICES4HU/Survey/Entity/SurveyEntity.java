package Misak.CS.ICES4HU.Survey.Entity;

import java.util.List;

import Misak.CS.ICES4HU.Question.QuestionEntity;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class SurveyEntity {
    @Id
    private Long Id;

    @ElementCollection
    private List<QuestionEntity> questions;

}
