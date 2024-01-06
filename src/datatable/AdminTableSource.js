export const userColumns = [
    { field: "id", headerName: "S.No", width: 70 },
    {
      field: "name",
      headerName: "Name",
      width: 230,
      renderCell: (params) => {
        return (
          <div>
            {params.row.firstName} {params.row.lastName}
          </div>
        );
      },
    },
    {
      field: "address2",
      headerName: "Location",
      width: 230,
    },
  ];