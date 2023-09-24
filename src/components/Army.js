
import Grid from '../style/Grid';
import Slot from '../containers/Slot';
import Area from '../style/Area';

const slots = [0, 1, 2, 3].map(function(y) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8].map(function(x) {
        const slot = x + y * 9;
        return <Slot key={slot} slot={slot} area="army" />;
    });
});

const Army = () => <Area>
    <Grid rows={4}>{slots}</Grid>
</Area>;

export default Army;
