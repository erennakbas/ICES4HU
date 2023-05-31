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
import ConfigService from "src/services/configService";

import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { useState, useCallback } from "react";
import React from "react";
import axios from "axios";
const configService = ConfigService();

export const SemesterCoursesTable = (props) => {
  const {
    id = 0,
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
    setCourses,
    courseList,
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
          credit: courseToUpdate.credit,
          department: courseToUpdate.department,
        };

        // Send PUT request to update the course on the backend
        const response = await axios.put(
          `${configService.url}/semester/update/${id}`,
          updatedCourse
        );

        setCourses(response.data.courseList);
      }

      setEditMode((prevEditMode) => prevEditMode.filter((iD) => iD !== rowId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCellChange = (rowId, fieldName, newValue) => {
    console.log(rowId);
    console.log(fieldName);
    console.log(newValue);
    // Find the course by its ID
    const courseToUpdate = courseList.find((course) => course.id === rowId);
    // Update the specific field with the new value
    courseToUpdate[fieldName] = newValue;
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      console.log(courseId);
      if (!courseId) {
        console.log("courseId is null");
        const updatedItems = items.filter((course) => course.id !== courseId);
        console.log(updatedItems);
        setCourses([...updatedItems]);
        return;
      }
      console.log("courseId is not null");
      // Send DELETE request to remove course from the backend
      const response = await axios.delete(`${configService.url}/semester/${id}/${courseId}`);

      setCourses(response.data.courseList);

      // Deselect the deleted course if it was selected
      if (selected.includes(courseId)) {
        const updatedSelected = selected.filter((iD) => iD !== courseId);
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

                        <TableCell>{course.credit}</TableCell>
                        <TableCell>{course.department}</TableCell>
                      </>
                    )}
                    <TableCell>
                      <Button onClick={() => handleDeleteCourse(course.id)} color="secondary">
                        Delete
                      </Button>
                      {isEditMode ? (
                        course.id ? (
                          <Button onClick={() => exitEditMode(course.id)}>Save</Button>
                        ) : (
                          <h1></h1>
                        )
                      ) : course.id ? (
                        <Button onClick={() => enterEditMode(course.id)} color="warning">
                          Edit
                        </Button>
                      ) : (
                        <h1></h1>
                      )}
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
  id: PropTypes.string,
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
  setCourses: PropTypes.func,
  courseList: PropTypes.array,
};
