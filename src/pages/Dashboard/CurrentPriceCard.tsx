import React from "react";

import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';

import SkeletonCurrentPriceCard from '../../common/cards/skeleton/NetIncomeCard';

import MoneyIcon from '@mui/icons-material/Money';

import MainCard from "../../common/cards/MainCard";
import { IFinancialInfo } from "../../models/IResponse";
import { useCurrencySymbolHook } from "../../hook/financeHook";
import TrendArrow from "../../common/TrendArrow";

const CardWrapper = styled(MainCard)(({ theme }) => ({
    height: "100%",
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

const CurrentPriceCard: React.FC<{loading: boolean, data: IFinancialInfo | null}> = ({ loading, data }) => {
    const theme = useTheme();
    const currency = useCurrencySymbolHook()

    return (
        <>
            {!data || loading? (
                <SkeletonCurrentPriceCard />
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
                                                backgroundColor: theme.palette.primary.main,
                                                color: theme.palette.common.white,
                                                zIndex: 1
                                            }}
                                        >
                                            <MoneyIcon fontSize="inherit" />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                            {currency(data.currentPrice)}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            sx={{
                                                cursor: 'pointer',
                                                backgroundColor: theme.palette.secondary[200],
                                                color: theme.palette.secondary.dark
                                            }}
                                        >
                                            <TrendArrow isUp={data.fiftyDayAverage < data.currentPrice} />
                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 1.25 }}>
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: theme.palette.secondary[200]
                                    }}
                                >
                                    Current Price
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

export default CurrentPriceCard;