import { styled, useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import InfoCardSkeleton from "../../common/cards/skeleton/InfoCard";
import MainCard from "../../common/cards/MainCard";
import { gridSpacing } from "../../constants";
import { IFinancialInfo } from "../../models/IResponse";

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.light,
  overflow: "hidden",
  height: "100%",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: "50%",
    top: -30,
    right: -180,
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: "50%",
    top: -160,
    right: -130,
  },
}));

const InfoCard: React.FC<{ loading: boolean, data: IFinancialInfo | null }> = ({ data, loading
}) => {
  const theme = useTheme();

  return (
    <>
      {!data || loading? (
        <InfoCardSkeleton />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <List sx={{ py: 0 }}>
                  <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        sx={{
                            backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.common.white,
                            zIndex: 1
                        }}
                        src={data.logo_url}
                      >
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      sx={{
                        py: 0,
                        mt: 0.45,
                        mb: 0.45,
                      }}
                      primary={
                        <Typography variant="h5" sx={{ color: "#fff" }}>
                          {data.longName}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "primary.light", mt: 0.25 }}
                        >
                          Name
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12}>
                <List sx={{ py: 0 }}>
                  <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                    <ListItemText
                      sx={{
                        py: 0,
                        mt: 0.45,
                        mb: 0.45,
                      }}
                      primary={
                        <Typography variant="h5" sx={{ color: "#fff" }}>
                          {data.country}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "primary.light", mt: 0.25 }}
                        >
                          Country
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

export default InfoCard;
