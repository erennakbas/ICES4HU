package Misak.CS.ICES4HU.Question;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class QuestionEntity {

    @Id
    private Long Id;

    @Column(nullable = false)
    private String question;

    @Column(nullable = false)
    private String type;

    
    @Column()
    private String answer;
}
