import { GridRenderCellParams } from "@mui/x-data-grid";
import * as S from './styled'
import { rowType } from "../list/List";



interface Props{
    value:LocationIsoOption
}

export function LocationColumn({value}:Props) {
    return <S.LocationText enable={value.robot_enable}>{value.name}</S.LocationText>
}

interface LocationIsoOption{
     name: string;
    robot_enable: boolean;
}

export function renderLocation(
  params: GridRenderCellParams<rowType, any, any>,
) {
    
  if (params.value == null) {
        return '';
    }
    const value: LocationIsoOption = {
        name: params.value.name,
        robot_enable: params.value.robot_enable,
    };

  return <LocationColumn value={value} />;
}