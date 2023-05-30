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
  TablePagination,
  TableRow,
  TableCell as MuiTableCell,
  TextField,
  TableHead,
  Typography,
  Button,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { useState, useCallback } from "react";
import React from "react";

export const SemesterCoursesTable = (props) => {
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

  const TableCellEdit = ({ value, onChange }) => {
    const [cellValue, setCellValue] = useState(value);

    const handleInputChange = (event) => {
      const newValue = event.target.value;
      setCellValue(newValue);
      onChange(newValue);
    };

    return (
      <MuiTableCell>
        <TextField value={cellValue} onChange={handleInputChange} />
      </MuiTableCell>
    );
  };

  const [editMode, setEditMode] = useState([]);
  const [courseList, setCourseList] = useState(items);

  const enterEditMode = (rowId) => {
    setEditMode((prevEditMode) => [...prevEditMode, rowId]);
  };

  const exitEditMode = async (rowId) => {
    try {
      if (editMode.includes(rowId)) {
        // Find the course by its ID
        const courseToUpdate = items.find((course) => course.id === rowId);

        // Update the specific field with the new value
        const updatedCourse = {
          ...courseToUpdate,
          name: courseToUpdate.name,
          code: courseToUpdate.code,
          instructor: courseToUpdate.instructor,
          credit: courseToUpdate.credit,
          department: courseToUpdate.department,
        };

        // Send PUT request to update the course on the backend
        await axios.put(`${configService.url}/courses/${rowId}`, updatedCourse);

        // Update the course list state
        const updatedItems = items.map((course) => (course.id === rowId ? updatedCourse : course));
        setItems(updatedItems);
      }

      setEditMode((prevEditMode) => prevEditMode.filter((id) => id !== rowId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCellChange = (rowId, fieldName, newValue) => {
    // Find the course by its ID
    const courseToUpdate = courseList.find((course) => course.id === rowId);

    // Update the specific field with the new value
    courseToUpdate[fieldName] = newValue;

    // Update the course list state
    setCourseList([...courseList]);
  };

  const handleDeleteCourse = async (rowId) => {
    try {
      // Send DELETE request to remove course from the backend
      await axios.delete(`${configService.url}/courses/${rowId}`);

      // Remove the course from the items list in the state
      const updatedItems = items.filter((course) => course.id !== rowId);
      setItems(updatedItems);

      // Deselect the deleted course if it was selected
      if (selected.includes(rowId)) {
        const updatedSelected = selected.filter((id) => id !== rowId);
        setSelected(updatedSelected);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

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
                <TableCell>Instructor</TableCell>
                <TableCell>Credit</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((course) => {
                const isSelected = selected.includes(course.id);
                const isEditMode = editMode.includes(course.id);

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
                    {isEditMode ? (
                      <>
                        <TableCellEdit
                          value={course.name}
                          onChange={(newValue) => handleCellChange(course.id, "name", newValue)}
                        />
                        <TableCellEdit
                          value={course.code}
                          onChange={(newValue) => handleCellChange(course.id, "code", newValue)}
                        />
                        <TableCellEdit
                          value={course.instructor}
                          onChange={(newValue) =>
                            handleCellChange(course.id, "instructor", newValue)
                          }
                        />
                        <TableCellEdit
                          value={course.credit}
                          onChange={(newValue) => handleCellChange(course.id, "credit", newValue)}
                        />
                        <TableCellEdit
                          value={course.department}
                          onChange={(newValue) =>
                            handleCellChange(course.id, "department", newValue)
                          }
                        />
                      </>
                    ) : (
                      <>
                        <TableCell>{course.name}</TableCell>
                        <TableCell>{course.code}</TableCell>
                        <TableCell>{course.instructor}</TableCell>
                        <TableCell>{course.credit}</TableCell>
                        <TableCell>{course.department}</TableCell>
                      </>
                    )}
                    <TableCell>
                      {isEditMode ? (
                        <Button onClick={() => exitEditMode(course.id)}>Save</Button>
                      ) : (
                        <Button onClick={() => enterEditMode(course.id)} color="warning">
                          Edit
                        </Button>
                      )}
                      <Button onClick={() => handleDeleteCourse(course.id)} color="secondary">
                        Delete
                      </Button>
                    </TableCell>
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

SemesterCoursesTable.propTypes = {
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
