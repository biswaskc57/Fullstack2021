import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const Bloglist = ({ blogs }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs
              .sort(function (a, b) {
                return b.likes - a.likes;
              })
              .map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Bloglist;
