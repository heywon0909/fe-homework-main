// import Avatar from '@mui/material/Avatar';
import { GridRenderCellParams } from '@mui/x-data-grid';

import * as S from './styled'
import { rowType } from '../list/List';

export function renderRobotStatus(
  params: GridRenderCellParams<rowType, any, any>,
) {
  if (params.value == null) {
    return '';
  }


  const AddText = () => {
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    return <a href=''>Add</a>
  }
  const Text = () => <>{params.value.id}</>

    return (
        <S.Flex>
            <S.Circle style={{background: params.value.is_online? 'green':'gray'}}></S.Circle>
            {params.value.is_online ? <Text/>: <AddText/>}
      </S.Flex>
  );
}
