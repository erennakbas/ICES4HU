import { useCallback, useMemo, useState ,useEffect} from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import CheckIcon from '@heroicons/react/24/solid/CheckIcon';
import XmarkIcon from '@heroicons/react/24/solid/XmarkIcon';
import NoSymbolIcon from '@heroicons/react/24/solid/NoSymbolIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CoursesTable } from 'src/sections/course/courses-table';
import { CoursesSearch } from 'src/sections/course/courses-search';
import { applyPagination } from 'src/utils/apply-pagination';
import ConfigService from 'src/services/configService';
import axios from 'axios';
import { useRouter } from "next/router";
import { SemesterCoursesSearch } from 'src/sections/semester-course/semester-courses-search';
import { SemesterCoursesTable } from 'src/sections/semester-course/semester-courses-table';
import { useAuth } from 'src/hooks/use-auth';





const configService = ConfigService();
const now = new Date();




const Page = () => {
  const router = useRouter();
  const { user } = useAuth();
  
  const [values, setValues] = useState({
    ...user,
  });


  const [courseList, setCourseList] = useState([]);
  const [semesterData, setSemesterData] = useState([]);


  const fetchData = async () => {
    try {
      const response = await axios.get(`${configService.url}/semester/active`);
      setSemesterData(response.data);
      // filter response.data.courseList if instructor is not null and setCourseList
      const courseList = response.data.courseList.filter(
        (course) => course.instructor !== null
      );
      setCourseList(courseList);
    } catch (error) {
      alert("There is no active semester");
      router.push("/");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const useCourses = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(courseList, page, rowsPerPage);
      },
      [courseList,page, rowsPerPage]
    );
  };
  
  const useCourseIds = (courses) => {
    return useMemo(
      () => {
        return courses.map((course) => course.id);
      },
      [courses]
    );
  };



  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const courses = useCourses(page, rowsPerPage);
  const coursesIds = useCourseIds(courses);
  const coursesSelection = useSelection(coursesIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );
    // send selected courses to backend
    const saveCourses = async () => {
      try {
        const selectedCourses = courses.filter((course) =>
        coursesSelection.selected.includes(course.id)
      );
        const response = await axios.patch(`${configService.url}/users/courselist`, {  values, selectedCourses });
        console.log(response.data);
        alert("Courses added to your courses");
        setCourseList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

  

  return (
    <>
      <Head>
        <title>
          Courses
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Active Courses In {semesterData.description}
                </Typography>
              </Stack>
              
                <Button
                color="primary"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={saveCourses}
                >
                  Enroll Courses
                </Button>
                
            </Stack>
            <CoursesSearch />
            <CoursesTable
              count={courseList.length}
              items={courses}
              onDeselectAll={coursesSelection.handleDeselectAll}
              onDeselectOne={coursesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={coursesSelection.handleSelectAll}
              onSelectOne={coursesSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={coursesSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
