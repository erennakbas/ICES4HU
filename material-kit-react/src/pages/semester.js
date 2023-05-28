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
import { CoursesTable } from 'src/sections/course/courses-table';
import { CoursesSearch } from 'src/sections/course/courses-search';
import { applyPagination } from 'src/utils/apply-pagination';
import ConfigService from "src/services/configService";
import axios from "axios";
const configService = ConfigService();
const now = new Date();



const Page = () => {

    // define add new semester button
    const [selected, setSelected] = useState([]);
    const { isSelected, toggle } = useSelection(selected, setSelected);

    const [data, setData] = useState([]);

    const fetchData = async () => {
      try {
        const response = await axios.get(`${configService.url}/semester`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
    console.log(data);

    const handleDelete = useCallback(() => {
        setSelected([]);
    }, [setSelected]);

    const handleSelectAll = useCallback(() => {
        setSelected((prevSelected) => {
            if (prevSelected.length === data.length) {
                return [];
            }
            return data.map((course) => course.id);
        });
    }, [setSelected]);

    const handleSelectOne = useCallback((event, id) => {
        event.stopPropagation();
        toggle(id);
    }, [toggle]);

    const handleAddNewSemester = async (event) => {
        console.log("add new semester");
        // const remainingRequests = filterRequests();
        // const ids = {"ids": selectedEnrollments.map(e => e.id)}
        // axios
        //   .put(`${configService.url}/enrollment_requests/accept`, ids)
        //   .then(async function (response) {
        //     console.log("accepted");
            
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //     throw new Error("Please check your user id and password");
        //   });
        //   setData(remainingRequests);
          
      };
  
    return (
      <>
        <Head>
          <title>
            Semesters
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
                  Semesters
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
                    onClick={handleAddNewSemester}
                  >
                    Add New Semester
                  </Button>
                  
              </Stack>
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