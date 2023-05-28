package Misak.CS.ICES4HU.Semester.Entity;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity(name="semester")
public class SemesterEntity {
    @Id
    @Column(nullable = false, unique = true)
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;
    @Column(nullable = false)
    public String startDate;

    @Column(nullable = false)
    public String endDate;


}
