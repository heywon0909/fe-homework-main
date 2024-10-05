import { GridColDef } from "@mui/x-data-grid";
import List, { rowsType } from "./List";
import {  useCallback, useEffect, useState } from "react";
import { renderRobotStatus } from "../column/RobotStatusColumn";
import { renderStar } from "../column/StarColumn";
import { Location } from "../../mocks/db";
import { renderLocation } from "../column/LoactionColumn";
import LocationSelect from "../select/Select";
import * as S from './styled'
import SearchField from "../searchField/SearchField";

export default function ListContainer() {
    const columns: GridColDef<(rowsType)[number]>[] = [
        {
            field: 'star', headerName: 'star', width: 90, renderCell: renderStar,
            valueGetter: (value, row) =>
            row.star == null || row.id == null
                ? null
                : { start: row.star, id: row.id },
   },
  {
    field: 'name',
    headerName: 'Locations',
    width: 400,
    editable: false,
    renderCell: renderLocation,
    valueGetter: (value, row) =>
      row.name == null || row.robot == null
        ? null
        : { name: row.name, robot_enable: row.robot.is_online },
  },
  {
    field: 'robot',
    headerName: 'Robot Status',
    width: 400,
    editable: false,
    renderCell: renderRobotStatus,
    },
    {
    field: 'Location Types',
    headerName: 'Location Types',
    width: 200,
        editable: false,
     valueFormatter: (value,row) =>row.robot.is_online ? 'Serving':'Disinfection',
    }];
    
    
    const [rows, setRows] = useState<rowsType>([]);
    const [searchText, setSearchText] = useState<string>('');
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSearchText(e.target.value);
    
   
    
    // useEffect(() => {
    //      const fetchLocations = async () => {
    //     try {
    //         const [starredResponse, locationsResponse] = await Promise.all([
    //             fetch('/starred_location_ids'),
    //             fetch('/locations')
    //         ]);

    //         const starredData = await starredResponse.json();
    //         console.log('starredData',starredData)
    //         const starred_id = starredData.location_ids;

    //         const { locations } = await locationsResponse.json();

    //         const updatedLocations = locations.map((v: Location) => ({
    //             ...v,
    //             star: starred_id.includes(v.id),
    //         }));

    //         setRows(updatedLocations);

    //         console.log('locations', locations);
    //         console.log('starred_id', starred_id);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // }
    //     fetchLocations();
    // }, []);

    // useEffect(() => {
    //     if (searchText === '') return;
    //     const timer = setTimeout(() => {
    //         console.log('Fetching after search text change');
    //         fetchLocations();
    //     }, 500);

    //     return () => clearTimeout(timer);
    // }, [fetchLocations, searchText]);

    return (
        <>
            <S.Flex>
                <LocationSelect />
                <SearchField searchText={searchText}  handleSearch={handleSearch}/>
            </S.Flex>
            <List rows={rows} columns={columns} />
        </>)
}