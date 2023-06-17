import styles from './page.module.css'
import Island from './Island';
import { string2island } from '@/utils/islandParser/islandParser';
import islands from './data/islands.json';

const tiles = string2island('gs9R9sX');

export default function Home() {
  return (
    <main>
      <h1>Forbidden Map Maker</h1>
      <Island tiles={tiles} />
      Share: <input type='text' />
      {islands.map((island => <Island size='s' tiles={island.tiles} />))}
    </main>
  )
}
