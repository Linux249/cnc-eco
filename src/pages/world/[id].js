import { useRouter } from 'next/router';

import { DndProvider } from 'react-dnd-cjs';
import Backend from 'react-dnd-html5-backend-cjs';
import Base from '../../components/Base.js';
import BasesMenuRight from '../../components/BasesMenuRight';
import BuildingMenu from '../../containers/BuildingMenu';
import BasesMenu from '@/components/BasesMenu';
import usePlayer from '../../hooks/player';
import Body from '@/style/Body';
import Column from '@/style/Column';
import Defense from '../../components/Defense';
import Army from '../../components/Army';


export const Bases = (props) => {
    const router = useRouter();
    const { id } = router.query;
    const [player] = usePlayer(id);
    console.log('world/', id, player, props);
    const bases = player && player.bases;

    if(!bases) return <h1>No data for world: {id}</h1>
    return (
        <Column center>
            <DndProvider backend={Backend}>
                <BasesMenu bases={bases} />
                <Body large>
                    <BuildingMenu area='buildings' />
                    <Base />
                    <BasesMenuRight />
                    <BuildingMenu area='defense' />
                    <Defense />
                    <div />
                    <BuildingMenu area='army' />
                    <Army />
                    <div />
                    <div />
                    {/*<BestBuildingsToUpgrade />*/}
                </Body>
            </DndProvider>
        </Column>
    );
};

export default Bases;
