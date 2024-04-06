import Button from '@mui/material/Button';
export const userColumns = [
    { field: "id", headerName: "S.No", width: 70 },
    {field: "firstName", headerName: "First Name", width: 200},
    {field: "lastName", headerName: "Last Name", width: 200},
    {
      field: "name",
      headerName: "Name",
      width: 230,
      filterable:false,
      renderCell: (params) => {
        return (
          <div>
            <Button sx={{textTransform: "none"}} variant="text">{params.row.firstName} {params.row.lastName}</Button>
          </div>
        );
      },
    },
    {field: "address2", headerName: "Location", width: 230},
  ];