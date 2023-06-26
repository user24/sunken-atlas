import Main from "@/app/main";
import islands from '@/app/data/islands.json';
import { island2String } from '@/utils/islandParser/islandParser';

export default function IndexPage() {
    const startingIsland = island2String(islands[0].tiles);
    return (
        <Main islandString={startingIsland} />
    );
}