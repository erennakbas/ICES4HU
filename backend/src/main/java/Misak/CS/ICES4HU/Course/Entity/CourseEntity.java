package Misak.CS.ICES4HU.Course.Entity;

import Misak.CS.ICES4HU.Survey.Entity.SurveyEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@Entity(name="course")
public class CourseEntity {
    @Id
    @Column(nullable = false, unique = true)
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long Id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String code;

    @Column(nullable = false)
    private String credit;

    private String instructor;

    @Column(nullable = false)
    private String department;

    @ManyToOne
    private SurveyEntity surveyEntity;
}
