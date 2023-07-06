import styles from './Island.module.css';
import React from 'react';
import Link from 'next/link';
import { island2String } from '@/utils/islandParser/islandParser';

const Island = ({editable, tiles, size,  isLink, name, toggleTile}) => {
    const sumTiles = tiles.reduce((length, row) => length + row.filter(cell => cell === 1).length, 0);
    const validLength = sumTiles <= 24;
    const code = island2String(tiles);
    const islandClassName = editable ? 'layout-tiles editable': 'layout-tiles';
    /*{ (!editable) ? '' : (
        <>
        <div className={`sum ${validLength ? '' : 'invalid'}`}>({sumTiles} tiles)</div>
        {validLength ? '' : 'Forbidden Island only includes 24 tiles'}
        </>
    ) }*/
    const editorClasses = [styles.editor];
    if (size === 's') {
        editorClasses.push(styles.small);
    }

    const Wrapper = !isLink ? React.Fragment : ({children}) => {
        return <Link href={`/i/${code}`}>{children}</Link>;
    };
    return (
    <Wrapper>
        <div className={editorClasses.join(' ')}>
            <div className={styles.inner}>
                {tiles.map((row, y) => (
                    <div className={styles.tileRow} key={`tile-row-${y}`}>
                        {row.map((cell,x) => {
                            const classNames = [styles.tile];
                            if (cell===1) {
                                classNames.push(styles.filled);
                            } else if (cell===2) {
                                classNames.push(styles.impassable);
                            }
                            if (size==='s') {
                                classNames.push(styles.small);
                            }
                            const key = `tile-cell-${x},${y}`;
                            return <div onClick={editable ? () => toggleTile(x, y) : null} key={key} className={classNames.join(' ')} />
                        })}
                    </div>
                ))}
            </div>
        </div>
    </Wrapper>
    );
}

export default Island;