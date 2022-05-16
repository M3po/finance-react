import { useTheme, styled } from "@mui/material/styles";
import { Avatar, Box, Grid, Typography } from "@mui/material";

import Chart from "react-apexcharts";

import SkeletonNetIncomeCard from "../../common/cards/skeleton/NetIncomeCard";

import ChartData from "./chart-data/net-income-chart";

import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import MainCard from "../../common/cards/MainCard";
import { IFinancialFinancials } from "../../models/IResponse";
import React from "react";
import TrendArrow from "../../common/TrendArrow";
import { useCurrencySymbolHook } from "../../hook/financeHook";

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  overflow: "hidden",
  height: "100%",
  position: "relative",
  "&>div": {
    position: "relative",
    zIndex: 5,
  },
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: "50%",
    zIndex: 1,
    top: -85,
    right: -95,
    [theme.breakpoints.down("sm")]: {
      top: -105,
      right: -140,
    },
  },
  "&:before": {
    content: '""',
    position: "absolute",
    zIndex: 1,
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: "50%",
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down("sm")]: {
      top: -155,
      right: -70,
    },
  },
}));

const NetIncomeCard: React.FC<{
  loading: boolean;
  data: IFinancialFinancials | null;
}> = ({ loading, data }) => {
  const theme = useTheme();
  const currency = useCurrencySymbolHook()
  const [isNetIncomeRising, setIsNetIncomeRising] = React.useState<boolean | null>(false);
  const [NetIncomeValue, setNetIncomeValue] = React.useState<number>(0);
  const [graphConfig, setGraphConfig] = React.useState(ChartData)

  React.useEffect(() => {
    if (data) {
       const finData = data.financialItems;
      if (finData.length > 1) {
        const valLast = finData[finData.length - 1].netIncome;
        const valBeforeLast = finData[finData.length - 2].netIncome;
        setIsNetIncomeRising(valLast > valBeforeLast);
        setNetIncomeValue(valLast);
        const clonedGraphOptions = JSON.parse(JSON.stringify(ChartData));
        clonedGraphOptions.series[0].data = finData.map((item) => item.netIncome)
        setGraphConfig(clonedGraphOptions);

      } else if (finData.length > 0) {
        setNetIncomeValue(finData[finData.length - 1].netIncome);
      } else {
        setIsNetIncomeRising(null);
        setNetIncomeValue(0)
      }
    } else {
      setIsNetIncomeRising(null);
      setNetIncomeValue(0)
    }
  }, [data]);

  return (
    <>
      {!data || loading ? (
        <SkeletonNetIncomeCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        backgroundColor: theme.palette.secondary.main,
                        color: theme.palette.common.white,
                        mt: 1,
                      }}
                    >
                      <LocalMallOutlinedIcon fontSize="inherit" />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 0.75 }}>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Grid container alignItems="center">
                      <Grid item>
                        <Typography
                          sx={{
                            fontSize: "1.23rem",
                            fontWeight: 500,
                            mr: 1,
                            mt: 1.75,
                            mb: 0.75,
                          }}
                        >
                          {currency(NetIncomeValue)} {data.sign}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Avatar
                          sx={{
                            ...(theme.typography as any).smallAvatar,
                            cursor: "pointer",
                            backgroundColor: theme.palette.primary[200],
                            color: theme.palette.primary.dark,
                          }}
                        >
                          <TrendArrow isUp={isNetIncomeRising}/>
                        </Avatar>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            fontSize: "1rem",
                            fontWeight: 500,
                            color: theme.palette.primary[200],
                          }}
                        >
                          Net Income
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Chart {...graphConfig} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

export default NetIncomeCard;
