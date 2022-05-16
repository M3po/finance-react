import React from "react";
import { Grid, Typography } from "@mui/material";

import Chart from "react-apexcharts";

import SkeletonHistoryCard from "../../common/cards/skeleton/HistoryCard";

import chartData from "./chart-data/history-bar-chart";
import MainCard from "../../common/cards/MainCard";
import { gridSpacing } from "../../constants";
import { IFinancialHistory } from "../../models/IResponse";

const HistoryCard: React.FC<{
  loading: boolean;
  data: IFinancialHistory | null;
}> = ({ loading, data }) => {
  const [graphConfig, setGraphConfig] = React.useState(chartData);

  React.useEffect(() => {
    if (data) {
      const finData = data.historyItems;
      if (finData.low.length > 0 && finData.open.length > 0 && finData.high.length > 0) {
        const clonedGraphOptions = JSON.parse(JSON.stringify(chartData));
        clonedGraphOptions.series[0].data = finData.low;
        clonedGraphOptions.series[1].data = finData.open;
        clonedGraphOptions.series[2].data = finData.high;
        setGraphConfig(clonedGraphOptions);
      }
    }
  }, [data]);

  return (
    <>
      {!data || loading ? (
        <SkeletonHistoryCard />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="h4">History data</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart {...graphConfig} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

export default HistoryCard;

