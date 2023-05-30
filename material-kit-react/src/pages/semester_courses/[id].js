import { useRouter } from "next/router";



import { useCallback, useMemo, useState, useEffect } from "react";
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
import { applyPagination } from 'src/utils/apply-pagination';
import ConfigService from "src/services/configService";
import axios from "axios";
import { Dialog , DialogTitle, DialogContent,DialogActions,TextField, DialogContentText } from "@material-ui/core";
import Input from '@mui/material/Input';
import { useRef } from "react";
import { SemesterCoursesSearch } from "src/sections/semester-course/semester-courses-search";
import { SemesterCoursesTable } from "src/sections/semester-course/semester-courses-table";



const configService = ConfigService();
const now = new Date();



const Page = () => {
    

    const router = useRouter();
    const { id } = router.query;
    const [data, setData] = useState([]);
    const [courseList, setCourseList] = useState([]);

    const fetchData = async () => {
        try {
          const response = await axios.get(`${configService.url}/semester/${id}`);
          setData(response.data);
            setCourseList(response.data.courseList);
        } catch (error) {
          console.error(error);
        }
      };
    useEffect(() => {
    fetchData();
    }, []);

    const useCourses = (page, rowsPerPage) => {
        return useMemo(() => {
          return applyPagination(courseList, page, rowsPerPage);
        }, [courseList, page, rowsPerPage]);
      };
    
      const useCourseIds = (courses) => {
        return useMemo(() => {
          return courses.map((course) => course.id);
        }, [courses]);
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
        
    const addCourse = () => {
        console.log("add course");
        const course = {
            "id": courseList.length + 1,
            "name": "a",
            "code": "b",
            "instructor": "c",
            "department": "d",

        }
        
        setCourseList([...courseList, course]);
    }

    const saveCourses = () => {
        console.log("save courses");

        // get selected courses
        const selectedCourses = courses.filter((course) => coursesSelection.selected.includes(course.id));
        console.log(selectedCourses);

        // send selected courses to backend
        const saveCourses = async () => {
            try {
                const response = await axios.put(`${configService.url}/semester/${id}`, selectedCourses);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        saveCourses();


    
    }



    return (
      <>
        <Head>
          <title>
            {data.description} Courses
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
                    {data.description} Courses
                  </Typography>
                </Stack>
                  
              </Stack>

                <SemesterCoursesSearch />
                <Button variant="contained" color="primary" onClick={saveCourses}>
                    Save
                </Button>
                <SemesterCoursesTable
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
                <Button variant="contained" color="primary" onClick={addCourse}>
                    Add Course
                </Button>
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