import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import RemoveIcon from '@mui/icons-material/Remove';

const TrendArrow: React.FC<{ isUp: boolean | null }> = ({ isUp }) => {
  if (isUp) {
    return (
      <ArrowUpwardIcon
        fontSize="inherit"
        sx={{ transform: "rotate3d(1, 1, 1, 45deg)" }}
      />
    );
  } else if(isUp === false) {
    return (
      <ArrowDownwardIcon
        fontSize="inherit"
        sx={{ transform: "rotate3d(1, 1, 1, 45deg)" }}
      />
    );
  } else {
      return (
        <RemoveIcon
        fontSize="inherit"
      />
      )
  }
};

export default TrendArrow;
