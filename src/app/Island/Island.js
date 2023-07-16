import classNames from './Island.module.css';
import React from 'react';
import Link from 'next/link';
import { island2String } from '@/utils/islandParser/islandParser';
import { useTheme } from "next-themes";
import applyTheme from '@/utils/applyTheme';

const Island = ({editable, tiles, size,  isLink, name, toggleTile}) => {
    const { theme } = useTheme();
    const classes = applyTheme(theme, classNames);
    const code = island2String(tiles);
    const editorClasses = [classes.editor];
    if (size === 's') {
        editorClasses.push(classes.small);
    }

    const Wrapper = !isLink ? React.Fragment : ({children}) => {
        return <Link href={`/i/${code}`}>{children}</Link>;
    };
    return (
    <Wrapper>
        <div className={editorClasses.join(' ')}>
            <div className={classes.inner}>
                {tiles.map((row, y) => (
                    <div className={classes.tileRow} key={`tile-row-${y}`}>
                        {row.map((cell,x) => {
                            const classNames = [classes.tile];
                            if (cell===1) {
                                classNames.push(classes.filled);
                            } else if (cell===2) {
                                classNames.push(classes.impassable);
                            }
                            if (size==='s') {
                                classNames.push(classes.small);
                            }
                            const key = `tile-cell-${y}-${x}`;
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