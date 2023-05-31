import { useRouter } from "next/router";

import { useCallback, useMemo, useState, useEffect } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import CheckIcon from "@heroicons/react/24/solid/CheckIcon";
import XmarkIcon from "@heroicons/react/24/solid/XmarkIcon";
import NoSymbolIcon from "@heroicons/react/24/solid/NoSymbolIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
import ConfigService from "src/services/configService";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  DialogContentText,
} from "@material-ui/core";
import Input from "@mui/material/Input";
import { useRef } from "react";
import { SemesterCoursesSearch } from "src/sections/semester-course/semester-courses-search";
import { SemesterCoursesTable } from "src/sections/semester-course/semester-courses-table";

const configService = ConfigService();
const now = new Date();

const Page = () => {
    const router = useRouter();
    const { id } = router.query;

    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
          const response = await axios.get(`${configService.url}/courses/${id}`);
          setData(response.data);
          setCourseList(response.data.courseList);
        } catch (error) {
          console.error(error);
        }
      };
      useEffect(() => {
        fetchData();
      }, []);

  return (
    <>
      <Head>
        <title>{data.description} Survey</title>
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
                <Typography variant="h4">{data.description} Courses</Typography>
              </Stack>
            </Stack>


          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
