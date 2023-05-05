import { useCallback, useMemo, useState, useEffect } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import CheckIcon from "@heroicons/react/24/solid/CheckIcon";
import XmarkIcon from "@heroicons/react/24/solid/XmarkIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { EnrollmentsTable } from "src/sections/enrollment/enrollments-table";
import { EnrollmentsSearch } from "src/sections/enrollment/enrollments-search";
import { applyPagination } from "src/utils/apply-pagination";
import axios from "axios";
import ConfigService from "src/services/configService";
const configService = ConfigService();
const now = new Date();
/*
const data = [
  {
    id: "5e887ac47eed253091be10cb",
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "carson.darrin@devias.io",
    name: "Carson",
    surname: "Darrin",
    role: "Student",
  },
  {
    id: "5e887b209c28ac3dd97f6db5",
    avatar: "/assets/avatars/avatar-fran-perez.png",
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: "fran.perez@devias.io",
    name: "Fran Perez",
    surname: "Perez",
    role: "Instructor",
  },
  {
    id: "5e887b7602bdbc4dbb234b27",
    avatar: "/assets/avatars/avatar-jie-yan-song.png",
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    email: "jie.yan.song@devias.io",
    name: "Jie Yan",
    surname: "Song",
    role: "Instructor",
  },
  {
    id: "5e86809283e28b96d2d38537",
    avatar: "/assets/avatars/avatar-anika-visser.png",
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    email: "anika.visser@devias.io",
    name: "Anika",
    surname: "Visser",
    role: "Student",
  },
  {
    id: "5e86805e2bafd54f66cc95c3",
    avatar: "/assets/avatars/avatar-miron-vitold.png",
    createdAt: subDays(subHours(now, 7), 3).getTime(),
    email: "miron.vitold@devias.io",
    name: "Miron Vitold",
    surname: "Vitold",
    role: "Instructor",
  },
  {
    id: "5e887a1fbefd7938eea9c981",
    address: {
      city: "Berkeley",
      country: "USA",
      state: "California",
      street: "317 Angus Road",
    },
    avatar: "/assets/avatars/avatar-penjani-inyene.png",
    createdAt: subDays(subHours(now, 5), 4).getTime(),
    email: "penjani.inyene@devias.io",
    name: "Penjani Inyene",
    phone: "858-602-3409",
  },
  {
    id: "5e887d0b3d090c1b8f162003",
    address: {
      city: "Carson City",
      country: "USA",
      state: "Nevada",
      street: "2188  Armbrester Drive",
    },
    avatar: "/assets/avatars/avatar-omar-darboe.png",
    createdAt: subDays(subHours(now, 15), 4).getTime(),
    email: "omar.darobe@devias.io",
    name: "Omar Darobe",
    phone: "415-907-2647",
  },
  {
    id: "5e88792be2d4cfb4bf0971d9",
    address: {
      city: "Los Angeles",
      country: "USA",
      state: "California",
      street: "1798  Hickory Ridge Drive",
    },
    avatar: "/assets/avatars/avatar-siegbert-gottfried.png",
    createdAt: subDays(subHours(now, 2), 5).getTime(),
    email: "siegbert.gottfried@devias.io",
    name: "Siegbert Gottfried",
    phone: "702-661-1654",
  },
  {
    id: "5e8877da9a65442b11551975",
    address: {
      city: "Murray",
      country: "USA",
      state: "Utah",
      street: "3934  Wildrose Lane",
    },
    avatar: "/assets/avatars/avatar-iulia-albu.png",
    createdAt: subDays(subHours(now, 8), 6).getTime(),
    email: "iulia.albu@devias.io",
    name: "Iulia Albu",
    phone: "313-812-8947",
  },
  {
    id: "5e8680e60cba5019c5ca6fda",
    address: {
      city: "Salt Lake City",
      country: "USA",
      state: "Utah",
      street: "368 Lamberts Branch Road",
    },
    avatar: "/assets/avatars/avatar-nasimiyu-danai.png",
    createdAt: subDays(subHours(now, 1), 9).getTime(),
    email: "nasimiyu.danai@devias.io",
    name: "Nasimiyu Danai",
    phone: "801-301-7894",
  },
];*/

const Page = () => {
  // let data = null;
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${configService.url}/enrollment_requests`);
      setData(response.data);
      // Burada, data değişkenine verileri atıyoruz.
      // Bu kod bloğu içinde data değişkeni kullanılabilir.
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const useEnrollments = (page, rowsPerPage) => {
    return useMemo(() => {
      return applyPagination(data, page, rowsPerPage);
    }, [data, page, rowsPerPage]);
  };

  const useEnrollmentIds = (enrollments) => {
    return useMemo(() => {
      return enrollments.map((enrollment) => enrollment.id);
    }, [enrollments]);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const enrollments = useEnrollments(page, rowsPerPage);
  const enrollmentsIds = useEnrollmentIds(enrollments);
  const enrollmentsSelection = useSelection(enrollmentsIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const selectedEnrollments = enrollments.filter((enrollment) =>
    enrollmentsSelection.selected.includes(enrollment.id)
  );
  //console.log(selectedEnrollments);
  const handleAcceptRequest = async (event) => {
    console.log(enrollments);
    console.log(enrollmentsIds);
    console.log(selectedEnrollments);
    await axios
      .put(`${configService.url}/enrollment_requests/accept`, selectedEnrollments)
      .then(async function (response) {
        console.log(enrollmentsSelection.selected);
        const remainingRequests = data.filter((user) =>
          selectedEnrollments.selected.includes(user.id)
        );
        setData(remainingRequests);
        console.log("accepted");
      })
      .catch(function (error) {
        console.log(error);
        throw new Error("Please check your user id and password");
      });
  };

  const handleDeleteRequest = async (event) => {
    console.log(event);
    await axios
      .put(`${configService.url}/enrollment_requests/reject`, selectedEnrollments)
      .then(async function (response) {
        console.log("rejected");
      })
      .catch(function (error) {
        console.log(error);
        throw new Error("Please check your user id and password");
      });
  };

  return (
    <>
      <Head>
        <title>Enrollments</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Enrollment Requests</Typography>
              </Stack>
              <Stack spacing={1} justifyContent="space-between" direction="row">
                <Button
                  color="success"
                  startIcon={
                    <SvgIcon fontSize="small">
                      <CheckIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={handleAcceptRequest}
                >
                  Accept Request
                </Button>
                <Button
                  color="error"
                  startIcon={
                    <SvgIcon fontSize="small">
                      <XmarkIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={handleDeleteRequest}
                >
                  Reject Request
                </Button>
              </Stack>
            </Stack>
            <EnrollmentsSearch />
            <EnrollmentsTable
              count={data.length}
              items={enrollments}
              onDeselectAll={enrollmentsSelection.handleDeselectAll}
              onDeselectOne={enrollmentsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={enrollmentsSelection.handleSelectAll}
              onSelectOne={enrollmentsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={enrollmentsSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
