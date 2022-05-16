import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  FormControl,
  MenuItem,
  Select,
  Typography,
  Box,
} from "@mui/material";
import { useFinance } from "../../../hook/contextHook";
import { financeTicks } from "../../../constants";

const Header = () => {
  const theme = useTheme();
  const { tick, setTick, setCurrency } = useFinance();

  return (
    <>
      <Avatar
        variant="rounded"
        sx={{
          background: theme.palette.secondary.main,
          color: theme.palette.common.white,
        }}
        color="inherit"
      >
        {process.env.REACT_APP_TITLE_SHORT}
      </Avatar>
      <Typography
        variant="h6"
        component="h1"
        sx={{ flexGrow: 1, marginLeft: "1rem" }}
      >
        {process.env.REACT_APP_TITLE}
      </Typography>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box mr={2} >
        <Typography variant="h6">Ticker</Typography>
        </Box>
        <FormControl size="small">
          <Select
            sx={{ backgroundColor: theme.palette.common.white }}
            value={tick}
            onChange={(e) => {
              setTick(e.target.value)
              setCurrency("")
            }}
          >
            {financeTicks.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default Header;
