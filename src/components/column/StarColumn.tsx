// import Avatar from '@mui/material/Avatar';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { ReactComponent as Star } from '../../assets/star.svg'
import { GridRenderCellParams } from '@mui/x-data-grid';
import { rowType } from '../list/List';
import * as S from './styled'


export function renderStar(
  params: GridRenderCellParams<rowType, any, any>,
) {
  
  if (params.value == null) {
    return '';
  }

    return (
        <S.TransparentButton>
           {params.value.star ===true? <Star/>:<StarBorderIcon/>}
      </S.TransparentButton>
  );
}
