import { FC, useContext } from "react";
import { Button, TableCell, TableRow } from "@mui/material";
import type { TVisitorProps } from "./types";
import axios from "axios";
import { EventsContext } from "../Contexts/EventsContext";

export const Visitor: FC<TVisitorProps> = ({ visitor }) => {
  const formatedDate = new Date(visitor.date_of_birth).toLocaleDateString(
    "lt-LT"
  );

  const { setVisitors } = useContext(EventsContext);

  const full_name = `${visitor.first_name} ${visitor.last_name}`;

  const handleEditClick = () => {
    window.location.assign(`/visitors/edit-visitor/${visitor.id}`);
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this visitor?")) {
      axios
        .delete(`http://localhost:5000/visitors/delete-visitor/${visitor.id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          alert(`Visitor deleted successfully`);

          setVisitors((prevVisitor) =>
            prevVisitor.filter(
              (deletedVisitor) => deletedVisitor.id !== visitor.id
            )
          );
        })
        .catch((error) => {
          alert(error.response.data.error);
          console.error(error.response.data.error);
        });
    }
  };

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell align="center">{visitor.id}</TableCell>
      <TableCell align="center">{full_name}</TableCell>
      <TableCell align="center">{visitor.email}</TableCell>
      <TableCell align="center">{formatedDate}</TableCell>
      <TableCell align="center">{visitor.age}</TableCell>
      <TableCell align="center">{visitor.event_name}</TableCell>
      <TableCell align="right">
        <Button onClick={handleEditClick}>Edit</Button>
      </TableCell>
      <TableCell align="left">
        <Button onClick={handleDeleteClick}>Delete</Button>
      </TableCell>
    </TableRow>
  );
};
