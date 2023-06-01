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
import { Dialog , DialogTitle, DialogContent,DialogActions,TextField, DialogContentText } from "@material-ui/core";
import Input from '@mui/material/Input';
import { useRef } from "react";
import { SemesterTable } from "src/sections/semester/semester-table";


const configService = ConfigService();
const now = new Date();



const Page = () => {
    const startdateRef = useRef(null);
    const enddateRef = useRef(null);
    const descriptionRef = useRef(null);
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

    const handleAddNewSemester = async (event) => {
        const startDate = startdateRef.current.value;
        const endDate = enddateRef.current.value;
        const description = descriptionRef.current.value;
      
        const newSemester = {
          "description": description,
          "startDate": startDate,
          "endDate": endDate
        }
        axios
          .post(`${configService.url}/semester/create`, newSemester)
          .then(async function (response) {
            console.log("added");
            fetchData();
          })
          .catch(function (error) {
            alert("New semester could not be added.\nPlease check your input.\nDates should not overlap with existing semesters.");
          });
          handleClose();
      };

      const [open, setOpen] = useState(false);

      const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };


      const useSemesters = (page, rowsPerPage) => {
        return useMemo(() => {
          return applyPagination(data, page, rowsPerPage);
        }, [data, page, rowsPerPage]);
      };
    
      const useSemestersIds = (enrollments) => {
        return useMemo(() => {
          return enrollments.map((enrollment) => enrollment.id);
        }, [enrollments]);
      };
    
      const [page, setPage] = useState(0);
      const [rowsPerPage, setRowsPerPage] = useState(5);
      const semesters = useSemesters(page, rowsPerPage);
      const semestersIds = useSemestersIds(semesters);
      const semestersSelection = useSelection(semestersIds);
    
      const handlePageChange = useCallback((event, value) => {
        setPage(value);
      }, []);
    
      const handleRowsPerPageChange = useCallback((event) => {
        setRowsPerPage(event.target.value);
      }, []);
    
      
      const setSelectedRow = useCallback((selected) => {
        console.log(selected);
      }, []);

  
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
                
                <div>
                    <Button variant="outlined" onClick={handleClickOpen}>
                      Create New Semester
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>Add Semester</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          By defining a semester, you can add courses to it.
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="description"
                          label="Description"
                          type="text"
                          fullWidth
                          variant="standard"
                          inputRef={descriptionRef}
                        />
                        <Input
                          type="date"
                          slotProps={{
                            input: {
                              min: '2018-06-07T00:00',
                              max: '2031-06-14T00:00',
                            },
                          }}
                          margin="dense"
                          id="startdate"
                          label="Start Date"
                          fullWidth
                          inputRef={startdateRef}

                        />
                        <Input
                          type="date"
                          slotProps={{
                            input: {
                              min: '2018-06-07T00:00',
                              max: '2031-06-14T00:00',
                            },
                          }}
                          margin="dense"
                          id="enddate"
                          label="End Date"
                          fullWidth
                          inputRef={enddateRef}

                        />

                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="outlined" onClick={handleAddNewSemester}  >Add Semester</Button>
                          
                      </DialogActions>
                    </Dialog>
                  </div>
                  
              </Stack>

            <SemesterTable
              count={data.length}
              items={semesters}
              onDeselectAll={semestersSelection.handleDeselectAll}
              onDeselectOne={semestersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={semestersSelection.handleSelectAll}
              onSelectOne={semestersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={semestersSelection.selected}
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