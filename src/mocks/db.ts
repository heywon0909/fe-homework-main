export interface Location {
  id: number;
  name: string;
  robot: {
    id: string;
    is_online: boolean;
  };
}

export const locations: Location[] = [
  // Please add more locations to show features
  {
    id: 0,
    name: "Spicy restaurant",
    robot: {
      id: "abcde123",
      is_online: true,
    },
  },
  {
    id: 1,
    name: "Salty restaurant",
    robot: {
      id: "fghij456",
      is_online: false,
    },
  },
  {
    id: 2,
    name: "Sweety restaurant",
    robot: {
      id: "fghij4567",
      is_online: false,
    },
  },
   {
    id: 3,
    name: "Sour restaurant",
    robot: {
      id: "qwer1567",
      is_online: false,
    },
  },
  {
    id: 4,
    name: "Pizza restaurant",
    robot: {
      id: "qsdf1567",
      is_online: false,
    },
  },
  {
    id: 5,
    name: "Pasta restaurant",
    robot: {
      id: "vmfndf1567",
      is_online: false,
    },
  },
   {
    id: 6,
    name: "Brunch restaurant",
    robot: {
      id: "plmkn1567",
      is_online: false,
    },
  },
];
