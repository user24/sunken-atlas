import styles from './page.module.css'
import Island from './Island';
import { string2island } from '@/utils/islandParser/islandParser';
import islands from './data/islands.json';

const tiles = string2island('gs9R9sX');

export default function Home() {
  return (
    <>
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <h1>Forbidden Island Editor</h1>
          <Island tiles={tiles} />
          Share: <input type='text' />
          <h2 className='h2'>Explore the Islands</h2>
          <div className={styles.islandPreviews}>
            {islands.map((island => <Island size='s' tiles={island.tiles} />))}
          </div>
        </main>
      </div>
    </>
  )
}
