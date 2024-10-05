import { GridColDef } from "@mui/x-data-grid";
import List, { rowsType } from "./List";
import {   useEffect, useState } from "react";
import { renderRobotStatus } from "../column/RobotStatusColumn";
import { StartColumn } from "../column/StarColumn";
import { renderLocation } from "../column/LoactionColumn";
import LocationSelect from "../select/Select";
import * as S from './styled'
import SearchField from "../searchField/SearchField";
import { Location, locations } from "../../mocks/db";
import { useQuery } from "@tanstack/react-query";
import { paramsType, useLocations } from "../../hooks/useLocations";
import { debounce } from "@mui/material";



export default function ListContainer() {
    const columns: GridColDef<(rowsType)[number]>[] = [
    {
    field: 'star', headerName: 'star', width: 90, renderCell: StartColumn,
    valueGetter: (value, row) =>
    row.star == null || row.id == null
        ? null
        : { star: row.star, id: row.id },
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
    const [params, setParams] = useState<paramsType>({page:'1'});
    const { locationsQuery, starredQuery } = useLocations(params);
    const { data: locationsData } = locationsQuery;
    const { data: starredData } = starredQuery;
    

    useEffect(() => {
    // 두 데이터가 모두 존재할 때만 setRows 호출
        if (locationsData && starredData) {
   
        setRows(
            locationsData.locations.map((v: Location) => {
               
            return ({
            ...v,
            star: (starredData as unknown as number[])?.includes((v.id)) || false,
        })
        })
        );
    }
    }, [locationsData, starredData]);
        
  
    useEffect(() => {
        let timeout = null;
        if (searchText) {
            timeout = setTimeout(() => {
                 setParams({
                    page:'1',
                    location_name: searchText,
                    robot_id: searchText
                });
            }, 500);
        }
        return () => clearTimeout(timeout!)
    },[searchText]);
 


    return (
        <div>
            <S.Flex>
                <LocationSelect />
                <SearchField searchText={searchText}  handleSearch={handleSearch}/>
            </S.Flex>
            <List rows={rows} columns={columns} />
        </div>)
}