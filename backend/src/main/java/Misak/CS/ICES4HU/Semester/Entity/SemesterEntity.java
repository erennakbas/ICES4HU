package Misak.CS.ICES4HU.Semester.Entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Entity(name="semester")
public class SemesterEntity {
    @Column(nullable = false)
    public String startDate;

    @Column(nullable = false)
    public String endDate;


}
