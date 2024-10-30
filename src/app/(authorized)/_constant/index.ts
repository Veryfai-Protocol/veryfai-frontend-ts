type Earning = {
    id: string;
    earning: number;
    time: string;
    date: string;
  }
type Column = {
    accessorKey: string;
    header: string;
  }
   
export const earnings: Earning[] = [
    // {
    //   id: "728ed52f",
    //   earning: 0.0045,
    //   time: "7:21 AM",
    //   date: "14 October, 2024",
    // },
    // {
    //   id: "489e1d42",
    //   earning: 0.0025,
    //   time: "7:21 AM",
    //   date: "14 October, 2024",
    // },
    // ...
  ]

  export const columns: Column[] = [
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "time",
      header: "Time",
    },
    {
      accessorKey: "earnings",
      header: "Earnings",
    },
  ]