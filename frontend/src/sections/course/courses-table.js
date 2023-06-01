import PropTypes from "prop-types";
import { format } from "date-fns";
import { useRouter } from "next/router";

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
  Typography,
  Button,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";

export const CoursesTable = (props) => {
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
  const router = useRouter();
  const { id } = router.query;
  const createSurvey = (rowId) => {
    router.push(`/evaluate_survey/${rowId}`);
  };

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  console.log(router.pathname);
  console.log("router");
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
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
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Credit</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Department</TableCell>
                {router.pathname == "/mycourses" ? <TableCell>Actions</TableCell> : <></>}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((course) => {
                const isSelected = selected.includes(course.id);
                // const createdAt = format(course.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow hover key={course.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(course.id);
                          } else {
                            onDeselectOne?.(course.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={course.avatar}>{getInitials(course.name)}</Avatar>
                        <Typography variant="subtitle2">{course.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{course.code}</TableCell>
                    <TableCell>{course.credit}</TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>{course.department}</TableCell>
                    {router.pathname == "/mycourses" ? (
                      <TableCell>
                        <Button onClick={() => createSurvey(course.id)} color="warning">
                          Evaluate Survey
                        </Button>
                      </TableCell>
                    ) : (
                      <></>
                    )}
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

CoursesTable.propTypes = {
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
