import "./datatable.css";
import { DataGrid } from '@mui/x-data-grid';
import { userColumns } from "./AdminTableSource";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { setDoc, doc } from "firebase/firestore";  
import {db} from "../config/firebase";

const AdminTable = (props) => {
  const [open, setOpen] = useState(false);
  const [reviewFields, setReviewFields] = useState({});

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
    window.location.reload();
  }
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div >
            {params.row.approved === 'Y' ? 
            (
              <Button variant="outlined" size="small" href="/admin/detail">View</Button>
            ) : 
            (
              <Button variant="outlined" size="small" onClick={() => showReviewForm(params.row)}>Review</Button>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">  
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
        pageSize={10}
        pageSizeOptions={[5,10,15,20]}
      />
    </div>
  );
};

export default AdminTable;