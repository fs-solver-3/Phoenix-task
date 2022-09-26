import * as React from "react";
import Box from "@mui/material/Box";
import { green, grey, red } from "@mui/material/colors";
import Icon from "@mui/material/Icon";
import SvgIcon from "@mui/material/SvgIcon";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Avatar, Container, Typography } from "@mui/material";

interface Data {
  avatar: string;
  userName: string;
  email: string;
  name: string;
  joinedAt: string;
  lastLogin: string;
  status: string;
  bio: string;
}

interface HeadCell {
  id: string;
  label: string;
  align: "left" | "inherit" | "center" | "right" | "justify" | undefined;
  padding: "normal" | "checkbox" | "none" | undefined;
}

const headCells: HeadCell[] = [
  {
    id: "user",
    label: "User",
    align: "left",
    padding: "normal",
  },
  {
    id: "name",
    label: "Name",
    align: "left",
    padding: "normal",
  },
  {
    id: "joined_on",
    label: "Joined On",
    align: "left",
    padding: "normal",
  },
  {
    id: "last_login",
    label: "Last Login",
    align: "left",
    padding: "normal",
  },
  {
    id: "trx_balance",
    label: "Transactions/",
    align: "left",
    padding: "normal",
  },
  {
    id: "status",
    label: "Status",
    align: "left",
    padding: "normal",
  },
  {
    id: "bio",
    label: "Bio",
    align: "left",
    padding: "normal",
  },
];
function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) =>
          headCell.id == "name" ? (
            <TableCell
              key={headCell.id}
              align={headCell.align}
              padding={headCell.padding}
              sx={{
                backgroundImage:
                  "linear-gradient(to right, #F2F2F2 , #FFFFFF, #FFFFFF, #FFFFFF)",
              }}
            >
              {headCell.label}
            </TableCell>
          ) : (
            <TableCell
              key={headCell.id}
              align={headCell.align}
              padding={headCell.padding}
            >
              {headCell.label}
              {headCell.id == "trx_balance" && (
                <Typography variant="inherit">Balance</Typography>
              )}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
}

export default function CustomerTable() {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setData] = React.useState([]);
  React.useEffect(() => {
    fetch("./data.json")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setData(data);
      })
      .catch(function (err) {
        console.log(err, " error");
      });
  }, []);
  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead />
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: Data, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="normal"
                      >
                        <Container
                          maxWidth="sm"
                          sx={{
                            display: "flex",
                            padding: "0px !important",
                          }}
                        >
                          <Avatar
                            alt={row.userName}
                            src={row.avatar}
                            variant="rounded"
                            sx={{ bgcolor: grey[300] }}
                          />
                          <Container maxWidth="sm">
                            <Typography variant="inherit">
                              {row.userName}
                            </Typography>
                            <Typography variant="inherit">
                              {row.email}
                            </Typography>
                          </Container>
                        </Container>
                      </TableCell>
                      <TableCell
                        align="left"
                        padding="normal"
                        sx={{
                          backgroundImage:
                            "linear-gradient(to right, #F2F2F2 , #FFFFFF, #FFFFFF, #FFFFFF)",
                        }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        align="left"
                        padding="normal"
                        sx={{
                          backgroundColor: grey[100],
                        }}
                      >
                        {new Date(row.joinedAt).toLocaleDateString("en-GB")}
                      </TableCell>
                      <TableCell align="left" padding="normal">
                        {new Date(row.lastLogin).toLocaleString("en-GB")}
                      </TableCell>
                      <TableCell align="left" padding="normal">
                        <Typography variant="inherit" sx={{ color: red[500] }}>
                          -$200,00
                        </Typography>
                        <Typography
                          variant="inherit"
                          sx={{ color: green[500] }}
                        >
                          $500,00
                        </Typography>
                      </TableCell>
                      <TableCell align="left" padding="normal">
                        <Typography
                          variant="inherit"
                          justifyContent={"space-between"}
                          sx={{
                            display: "flex",
                            backgroundColor: grey[100],
                            borderRadius: "10px",
                            padding: "10px",
                            width: "80px",
                          }}
                        >
                          {row.status}
                          {row.status == "Active" && (
                            <SvgIcon
                              sx={{
                                fontSize: 13,
                                color: green[500],
                                marginTop: "3px",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512z" />
                              </svg>
                            </SvgIcon>
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell align="left" padding="normal">
                        {row.bio}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
