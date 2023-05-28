import { useCallback, useMemo, useState, useEffect } from 'react';
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
import { UsersTable } from 'src/sections/user/users-table';
import { UsersSearch } from 'src/sections/user/users-search';
import { applyPagination } from 'src/utils/apply-pagination';
import axios from 'axios';
import ConfigService from "src/services/configService";
const configService = ConfigService();

const Page = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${configService.url}/users`);
      setData(response.data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const useUsers = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(data, page, rowsPerPage);
      },
      [data, page, rowsPerPage]
    );
  };
  
  const useUserIds = (users) => {
    return useMemo(
      () => {
        return users.map((user) => user.id);
      },
      [users]
    );
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const users = useUsers(page, rowsPerPage);
  const userIds = useUserIds(users);
  const usersSelection = useSelection(userIds);
  const selectedUsers = users.filter((user) =>
      usersSelection.selected.includes(user.id)
    );
  const filterUsers = () => {
    return data.filter((user) =>
      !selectedUsers.includes(user))
    }
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
  
  //console.log(selectedEnrollments);
  const handleBanUsers = async (event) => {
    const ids = {"ids": selectedUsers.map(e => e.id)}
    axios
      .put(`${configService.url}/users/ban`, ids)
      .then(async function (response) {
        console.log("banned");
        
      })
      .catch(function (error) {
        console.log(error);
        throw new Error("Please check your user id and password");
      });
      
  };

  const handleDeleteUsers = async (event) => {
    const remainingUsers = filterUsers();
    const ids = {"ids": selectedUsers.map(e => e.id)}
    axios
      .put(`${configService.url}/users/delete`, ids)
      .then(async function (response) {
        console.log("deleted");
      })
      .catch(function (error) {
        console.log(error);
        throw new Error("Please check your user id and password");
      });
      setData(remainingUsers);

  };
  return (
    <>
      <Head>
        <title>
          Users
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
                  Users
                </Typography>
              </Stack>
              <Stack spacing={1} 
              justifyContent="space-between"  
              direction="row">
                <Button
                onClick={handleBanUsers}
                color="warning"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <NoSymbolIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Ban User
                </Button>
                <Button
                onClick={handleDeleteUsers}
                color="error"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <XmarkIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Delete User
                </Button>
              </Stack>
            </Stack>
            <UsersSearch />
            <UsersTable
              count={data.length}
              items={users}
              onDeselectAll={usersSelection.handleDeselectAll}
              onDeselectOne={usersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={usersSelection.handleSelectAll}
              onSelectOne={usersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={usersSelection.selected}
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
