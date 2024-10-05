import { http, HttpResponse } from "msw";

import { Location, locations } from "./db";

interface LocationsResult {
  total_count: number;
  locations: Location[];
}

interface LocationsPathParams {
  page: string;
  location_name: string;
  robot_id: string;
  is_starred: string;
}

export const handlers = [
  http.get<LocationsPathParams>("/locations", ({params}) => {

    const { page, location_name, robot_id, is_starred } = params;
   
    // Please implement filtering feature here
    let filter_locations = locations;
    if (location_name) {
      filter_locations = filter_locations.filter(v => v.name.includes(location_name));
    }
    if (robot_id) {
      filter_locations = filter_locations.filter(v => v.robot.id.includes(robot_id))
    }

    const starredItem =  sessionStorage.getItem("starred_location_ids")
    if (is_starred === 'true') {
      filter_locations = locations.filter(v => starredItem?.includes(String(v.id)));
    } else if (is_starred === 'false') {
      filter_locations = locations.filter(v => !starredItem?.includes(String(v.id)));
    }
    
     const itemsPerPage = 6; 
     const startIndex = (Number(page) - 1) * itemsPerPage;
     const endIndex = startIndex + itemsPerPage;
     let paginatedLocations = locations.slice(startIndex, endIndex);
   
   
    const result: LocationsResult = {
      total_count: 0,
      locations: locations,
    };
   

   return HttpResponse.json(result, {
     status: 200,
    })
  }),

  http.get("/starred_location_ids", () => {
    const location_ids = JSON.parse(
      sessionStorage.getItem("starred_location_ids") || "[]",
    );

    return HttpResponse.json({
      location_ids,
    });
  }),

  http.put("/starred_location_ids", async ({ request }) => {
     // 
    if (!request.body) {
      return HttpResponse.json(
        { error_msg: "Encountered unexpected error" },
        { status: 500 },
      );
    }
  
    const data = await request.json();

    const location_ids = JSON.parse(
      sessionStorage.getItem("starred_location_ids") || "[]",
    );

   
    

    const list = location_ids.includes(data) ? location_ids.filter((v:string)=>v!=data) : location_ids.concat([data])

    sessionStorage.setItem(
      "starred_location_ids",
      JSON.stringify(list),
    );

    return HttpResponse.json(null, { status: 204 });
  }),
];
