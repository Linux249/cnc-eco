
import { connect } from 'react-redux';
import Counter from '../style/Counter';

function CountStructure({ count, area }) {
    return (
        <Counter>
            {count}/40
        </Counter>
    );
}

export default connect((state, ownProps) => ({ count: state.base.count[ownProps.area] }))(
    CountStructure
);
