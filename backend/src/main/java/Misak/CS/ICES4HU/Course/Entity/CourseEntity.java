package Misak.CS.ICES4HU.Course.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@Entity
public class CourseEntity {
    @Id
    private Long Id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String code;

    @Column(nullable = false)
    private int credit;

    @Column(nullable = false)
    private String instructor;

    @Column(nullable = false)
    private String department;

}
