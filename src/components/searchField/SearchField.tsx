import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface Props{
    handleSearch: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    searchText: string;
}
export default function SearchField({handleSearch,searchText}:Props) {
    return (
        <Paper  component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 240 }}>
        <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search robot or location"
        inputProps={{ 'aria-label': 'Search robot or location' }}
        value={searchText}
        onChange={handleSearch}    
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
    )
}