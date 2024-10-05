// import Avatar from '@mui/material/Avatar';


import { ReactComponent as Star } from '../../icons/star.svg'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { GridRenderCellParams } from '@mui/x-data-grid/models';
import { rowType } from '../list/List';
import * as S from './styled'
import { useLocations } from '../../hooks/useLocations';


export function StartColumn(
  params: GridRenderCellParams<rowType, any, any>,
) {
  const { addStarredLocation } = useLocations(undefined);
  const onHandleStar = (id: number) => {
    addStarredLocation.mutate(id);
  }

  if (params.value == null) {
    return '';
  }

 
 

    return (
        <S.TransparentButton onClick={()=>onHandleStar(params.value.id)}>
           {params.value.star === true ? (
            <StarIcon/>  // fill 스타일 직접 적용
          ) : (
            <Star />  // stroke와 fill 스타일 적용
          )}
      </S.TransparentButton>
  );
}
