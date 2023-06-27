import classes from './main.module.css'
import { useState, useEffect } from 'react';
import Island from './Island';
import { string2island } from '@/utils/islandParser/islandParser';
import islands from './data/islands.json';
import { IM_Fell_English_SC as Font } from 'next/font/google';

const font = Font({
  subsets: ['latin'],
  weight: ['400']
});

const hostname = 'https://sunkenatlas.com';

export default function Main({islandString='', loading}) {

  const [copyLabel, setCopyLabel] = useState('Copy');
  const tiles = string2island(islandString);
  const link = `${hostname}/i/${islandString}`;

  useEffect(() => {
    setCopyLabel('Copy');
  }, [islandString]);

  const selectMe = (e) => {
    e.target.select();
  };

  const copy = () => {
    navigator.clipboard.writeText(link);
    setCopyLabel('Copied');
  }

  return (
    <div className={classes.wrapper}>
      <main className={classes.main}>
        <h1 className={[font.className, classes.h1].join(' ')}>The Sunken Atlas</h1>
        <div className={classes.welcome}>Alternate layouts &amp; map editor for Forbidden Island</div>
        <Island tiles={tiles} />
        {loading && islandString ? null : (
          <>
            <h2 className={classes.h2}>Share this island</h2>
            <div className={classes.share}>
              <input className={classes.shareBox} type='text' value={link} readOnly onClick={selectMe} />
              <button className={classes.shareButton} onClick={copy}>{copyLabel}</button>
            </div>
          </>
        )}
        <h2 className={classes.h2}>Explore other islands</h2>
        <div className={classes.islandPreviews}>
          {islands.map((island => <Island size='s' isLink={true} tiles={island.tiles} key={island.tiles} />))}
        </div>
      </main>
    </div>
  )
}
