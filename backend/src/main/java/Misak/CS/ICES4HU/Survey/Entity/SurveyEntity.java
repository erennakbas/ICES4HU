package Misak.CS.ICES4HU.Survey.Entity;

import java.util.List;

import Misak.CS.ICES4HU.Question.Entity.QuestionEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;

@Entity
@Data
public class SurveyEntity {
    @Id
    @Column(nullable = false, unique = true)
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long Id;

    @ElementCollection
    @ManyToMany(
    cascade = CascadeType.ALL)
    private List<QuestionEntity> questions;

}
