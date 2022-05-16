import React from "react";
import { Box, Grid } from "@mui/material";
import CurrentPriceCard from "./CurrentPriceCard";
import HistoryCard from "./HistoryCard";
import InfoCard from "./InfoCard";
import { gridSpacing } from "../../constants";
import { useFinanceApi } from "../../hook/financeHook";
import {
  IFinancialFinancials,
  IFinancialHistory,
  IFinancialInfo,
} from "../../models/IResponse";
import { useFinance } from "../../hook/contextHook";
import NetIncomeCard from "./NetIncomeCard";

function App() {
  const { getInfo, getFinancials, getHistory } = useFinanceApi();
  const { setCurrency } = useFinance();
  const [infoData, setInfoData] = React.useState<IFinancialInfo| null>(null);
  const [infoDataLoading, setInfoDataLoading] = React.useState<boolean>(true)

  const [financialData, setFinancialData] = React.useState<
  IFinancialFinancials | null
>(null);
const [financialDataLoading, setFinancialDataLoading] = React.useState<boolean>(true);

const [historyData, setHistoryData] = React.useState<IFinancialHistory | null>(null);
const [historyDataLoading, setHistoryDataLoading] = React.useState<boolean>(true);


  const fetchInfoData = React.useCallback(async () => {
    const response = await getInfo()
    setInfoDataLoading(false)
    setCurrency(response.currency)
    setInfoData(response);
  }, [getInfo, setCurrency]);

  const fetchFinancialData = React.useCallback(async () => {
    const response = await getFinancials()
    setFinancialDataLoading(false)
    setFinancialData(response);
  }, [getFinancials]);

  const fetchHistoryData = React.useCallback(async () => {
    const response = await getHistory()
    setHistoryDataLoading(false)
    setHistoryData(response);
  }, [getHistory]);

  React.useEffect(() => {
    setFinancialDataLoading(true);
    fetchFinancialData();
  }, [fetchFinancialData]);

  React.useEffect(() => {
    setInfoDataLoading(true)
    fetchInfoData()
  }, [fetchInfoData])

  React.useEffect(() => {
    setHistoryDataLoading(true)
    fetchHistoryData()
  }, [fetchHistoryData])

  return (
    <Box mb={4}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <InfoCard loading={infoDataLoading} data={infoData}/>
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <CurrentPriceCard loading={infoDataLoading} data={infoData} />
            </Grid>
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <NetIncomeCard data={financialData} loading={financialDataLoading} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <HistoryCard loading={historyDataLoading} data={historyData}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
