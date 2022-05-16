import { Card, CardContent, Grid } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { gridSpacing } from '../../../constants';


const HistoryCard = () => (
    <Card>
        <CardContent>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" height={530} />
                </Grid>
            </Grid>
        </CardContent>
    </Card>
);

export default HistoryCard;
