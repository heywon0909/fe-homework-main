import styled from "@emotion/styled";

export const Circle = styled.div`
    width:20px;
    height:20px;
    border-radius:30px;
`
export const Flex = styled.div`
    display:flex;
    align-items:center;
    gap:5px;
`

export const LocationText = styled.div<{ enable: boolean }>`
    width:400px;
    height:36px;
    background:${({ enable }) => enable ? 'blue' : 'gray'};
    color:#fff;
`

export const TransparentButton = styled.button`
    border:none;
    outline:none;
    background:none;
`