package Misak.CS.ICES4HU.Semester.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

import Misak.CS.ICES4HU.Course.Entity.CourseEntity;

@Data
@Entity(name="semester")
public class SemesterEntity {
    @Id
    @Column(nullable = false, unique = true)
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    public String description;

    @Column(nullable = false)
    public String startDate;

    @Column(nullable = false)
    public String endDate;

    @Column(nullable = false)
    public List<CourseEntity> courseList = new ArrayList<>();

    



}
