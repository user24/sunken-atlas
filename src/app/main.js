import styles from './main.module.css'
import Island from './Island';
import { string2island } from '@/utils/islandParser/islandParser';
import islands from './data/islands.json';

export default function Main({islandString='gs9R9sX'}) {
  const tiles = string2island(islandString);
  return (
    <>
      <div className={styles.wrapper}>
        <main className={styles.main}>
          <h1 className={styles.h1}>Forbidden Island Map Editor</h1>
          <Island tiles={tiles} />
          Share: <input type='text' />
          <h2 className={styles.h2}>Explore other islands</h2>
          <div className={styles.islandPreviews}>
            {islands.map((island => <Island size='s' isLink={true} tiles={island.tiles} />))}
          </div>
        </main>
      </div>
    </>
  )
}
