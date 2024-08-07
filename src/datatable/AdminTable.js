import "./datatable.css";
import { DataGrid } from '@mui/x-data-grid';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { setDoc, doc } from "firebase/firestore";  
import {db} from "../config/firebase";
import Link from '@mui/material/Link';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const AdminTable = (props) => {
  const [open, setOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [reviewFields, setReviewFields] = useState({});
  const {fetchAdminUsersFun} = props;

  const handleClose = () => {
    setOpen(false);
  };
  const showReviewForm = (rowData) => {
    setOpen(true);
    setReviewFields(rowData);
  }
  const approveAdmin = async () => {
    await setDoc(doc(db, "admin-users", `${reviewFields.firstName} ${reviewFields.lastName}`), {...reviewFields, approved: 'Y'});
    setOpen(false);
    setSnackBarOpen(true);
  }

  const handleSnakbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
    fetchAdminUsersFun();
  };

  const userColumns = [
    { field: "id", headerName: "S.No", width: 100 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      filterable:false,
      renderCell: (params) => {
        return (
			<div>
				<Link
          underline="hover"
					component="button"
					variant="body2"
					onClick={() =>
						props.createNewTab('contact',	`${params.row.firstName} ${params.row.lastName}_${params.row.id}#contact`)
					}
				>
					{params.row.firstName} {params.row.lastName}
				</Link>
			</div>
		);
      },
    },
    {field: "firstName", headerName: "First Name", width: 200},
    {field: "lastName", headerName: "Last Name", width: 200},
    {field: "address2", headerName: "Location", width: 200},
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      filterable:false,
      renderCell: (params) => {
        return (
          <div >
            {params.row.approved === 'Y' ? 
              (
                <Button variant="outlined" size="small" sx={{minWidth:'82px'}} 
                  onClick={() => props.createNewTab('adminDetail',`${params.row.firstName} ${params.row.lastName}_${params.row.id}#admindetail`)
                }>View</Button>
              ) : 
              (
                <Button variant="outlined" size="small" sx={{minWidth:'82px'}} onClick={() => showReviewForm(params.row)}>Review</Button>
              )
            }
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <Snackbar 
        open={snackBarOpen} 
        autoHideDuration={2000} 
        onClose={handleSnakbarClose} 
        anchorOrigin={{ vertical:"bottom", horizontal:"right" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Approved Successfully
        </Alert>
      </Snackbar>
      <Dialog open={open} onClose={handleClose}>        
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent> 
          <Stack className="reviewDiv" direction={"row"} spacing={5}>
            <div style={{width:'80px'}}>First Name</div><div>{reviewFields.firstName}</div>
          </Stack>
          <Stack direction={"row"} className="reviewDiv" spacing={5}>
            <div style={{width:'80px'}}>Last Name</div><div>{reviewFields.lastName}</div>
          </Stack>
          <Stack direction={"row"} className="reviewDiv" spacing={5}>
            <div style={{width:'80px'}}>Phone</div><div>{reviewFields.phone}</div>
          </Stack>
          <Stack direction={"row"} className="reviewDiv" spacing={5}>
            <div style={{width:'80px'}}>Email</div><div>{reviewFields.email}</div>
          </Stack>
          <div className="centerContents"><Button variant="outlined" size="small" onClick={approveAdmin}>Approve</Button></div>
        </DialogContent>        
      </Dialog>    
      <DataGrid
        disableRowSelectionOnClick 
        className="datagrid"
        rows={props.data}
        columns={userColumns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5,10,20,50,100]}
      />
    </div>
  );
};

export default AdminTable;