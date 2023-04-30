package Misak.CS.ICES4HU.Survey.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class SurveyEntity {
    @Id
    private Long Id;
}
