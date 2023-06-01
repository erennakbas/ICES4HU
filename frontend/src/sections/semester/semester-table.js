import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography} from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Scrollbar } from "src/components/scrollbar";
import { useState } from "react";
import { getInitials } from "src/utils/get-initials";
import { color } from "@mui/system";
import { useRouter } from "next/router";

const useStyles = makeStyles({
  hover: {
    cursor: 'pointer',
  },
});

export const SemesterTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  //console.log(onSelectOne);
  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  
  const router = useRouter();

  const classes = useStyles();

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell> */}
                <TableCell>description</TableCell>
                <TableCell>startdate</TableCell>
                <TableCell>enddate</TableCell>
                <TableCell>status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((semester) => {
                const isSelected = selected.includes(semester.id);
                const isSemesterActive = () => {
                    const today = new Date();
                    const startDate = new Date(semester.startDate);
                    const endDate = new Date(semester.endDate);
                    if (today >= startDate && today <= endDate) {
                        return "Active";
                    }
                    return "Not Active";
                }

                const getBackgroundColor = deadline => {
                    if(isSemesterActive() === "Active") return 'green';
                    return 'gray';
                }

                const handleSemesterSelect = (semesterId) => {
                    if(isSemesterActive() === "Not Active") {
                        return;
                    }
                    // redirect to semester details page to add courses
                    router.push(`/semester_courses/${semesterId}`);

                  }

                return (
                  <TableRow classes={{ hover: classes.hover }}
                  hover key={semester.id} selected={isSelected} onClick={() => handleSemesterSelect(semester.id)}  >
                    {/* <TableCell padding="checkbox">color={() => {if(isSemesterActive()) return "green" ; else return "gray"} }
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(semester.id);
                          } else {
                            onDeselectOne?.(semester.id);
                          }
                        }}
                      />
                    </TableCell> */}
                    {/* <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={semester.avatar}>{getInitials(semester.firstName)}</Avatar> 
                        <Typography variant="subtitle2">{semester.firstName}</Typography>
                      </Stack>
                    </TableCell> */}

                    <TableCell>{semester.description}</TableCell>
                    <TableCell>{semester.startDate}</TableCell>
                    <TableCell>{semester.endDate}</TableCell>
                    <TableCell style={{backgroundColor:getBackgroundColor()}} >{isSemesterActive()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

SemesterTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
