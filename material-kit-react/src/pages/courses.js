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





const configService = ConfigService();
const now = new Date();

// const data = [
//   {
//     id: '5e887ac47eed253091be10cb',
//     createdAt: subDays(subHours(now, 7), 1).getTime(),
//     name: 'Software Engineering',
//     code:"BBM382",
//     instructor:"Ebru Gökalp",
//     department:"Computer Engineering",
//   },
//   {
//     id: '5e887b209c28ac3dd97f6db5',
//     createdAt: subDays(subHours(now, 1), 2).getTime(),
//     name: 'Introduction to Programming I',
//     code:"BBM101",
//     instructor:"Erkut Erdem",
//     department:"Computer Engineering"
//   },
//   {
//     id: '5e887b7602bdbc4dbb234b27',
//     createdAt: subDays(subHours(now, 4), 2).getTime(),
//     name: 'Mathematics I',
//     code:"MAT123",
//     instructor:"Mesut Şahin",
//     department:"Mathematics"
//   },
//   {
//     id: '5e86809283e28b96d2d38537',
//     createdAt: subDays(subHours(now, 11), 2).getTime(),
//     name: 'Physics1',
//     code:"FİZ137",
//     instructor:"Akın Bacıoğlu",
//     department:"Physics",
//   },
//   {
//     id: '5e86805e2bafd54f66cc95c3',
//     createdAt: subDays(subHours(now, 7), 3).getTime(),
//     name: 'Logic Design',
//     code:"BBM231",
//     instructor:"Süleyman Tosun",
//     department:"Computer Engineering",
//   },
//   {
//     id: '5e887a1fbefd7938eea9c981',
//     address: {
//       city: 'Berkeley',
//       country: 'USA',
//       state: 'California',
//       street: '317 Angus Road'
//     },
//     createdAt: subDays(subHours(now, 5), 4).getTime(),
//     email: 'penjani.inyene@devias.io',
//     name: 'Penjani Inyene',
//     phone: '858-602-3409'
//   },
//   {
//     id: '5e887d0b3d090c1b8f162003',
//     address: {
//       city: 'Carson City',
//       country: 'USA',
//       state: 'Nevada',
//       street: '2188  Armbrester Drive'
//     },
//     createdAt: subDays(subHours(now, 15), 4).getTime(),
//     email: 'omar.darobe@devias.io',
//     name: 'Omar Darobe',
//     phone: '415-907-2647'
//   },
//   {
//     id: '5e88792be2d4cfb4bf0971d9',
//     address: {
//       city: 'Los Angeles',
//       country: 'USA',
//       state: 'California',
//       street: '1798  Hickory Ridge Drive'
//     },
//     createdAt: subDays(subHours(now, 2), 5).getTime(),
//     email: 'siegbert.gottfried@devias.io',
//     name: 'Siegbert Gottfried',
//     phone: '702-661-1654'
//   },
//   {
//     id: '5e8877da9a65442b11551975',
//     address: {
//       city: 'Murray',
//       country: 'USA',
//       state: 'Utah',
//       street: '3934  Wildrose Lane'
//     },
//     createdAt: subDays(subHours(now, 8), 6).getTime(),
//     email: 'iulia.albu@devias.io',
//     name: 'Iulia Albu',
//     phone: '313-812-8947'
//   },
//   {
//     id: '5e8680e60cba5019c5ca6fda',
//     address: {
//       city: 'Salt Lake City',
//       country: 'USA',
//       state: 'Utah',
//       street: '368 Lamberts Branch Road'
//     },
//     createdAt: subDays(subHours(now, 1), 9).getTime(),
//     email: 'nasimiyu.danai@devias.io',
//     name: 'Nasimiyu Danai',
//     phone: '801-301-7894'
//   }
// ];



const Page = () => {
  const router = useRouter();


  const [courseList, setCourseList] = useState([]);
  const [semesterData, setSemesterData] = useState([]);


  const fetchData = async () => {
    try {
      const response = await axios.get(`${configService.url}/semester/active`);
      setSemesterData(response.data);
      setCourseList(response.data.courseList);
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

  const saveCourses = () => {
    console.log("add courses to mycourses");

    // get selected courses
    const selectedCourses = courses.filter((course) =>
      coursesSelection.selected.includes(course.id)
    );
    console.log(selectedCourses);

    // send selected courses to backend
    const saveCourses = async () => {
      try {
        const response = await axios.put(`${configService.url}/semester/${id}`, selectedCourses);
      } catch (error) {
        console.error(error);
      }
    };

    // saveCourses();
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
