import React, { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { motion } from 'framer-motion';
import { FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
import { SongNote } from './Menu';

type SongNoteProps = {
  // eslint-disable-next-line no-unused-vars
  onChange: (value: SongNote) => void,
  onRemove: () => void,
  songNote: SongNote,
  animalName: string,
};

const notes = 'CDEFGAB';

const SongNoteComponent = ({
  onChange,
  onRemove,
  songNote,
  animalName,
}: SongNoteProps) => {
  const [currentSongNote, setSongNote] = useState(songNote);

  const playNote = () => {
    if (currentSongNote.note > -1) {
      const audio = new Audio(`/${animalName}${currentSongNote.note}.mp3`);
      audio.play();
    }
  };

  useEffect(() => {
    onChange(currentSongNote);
  }, [currentSongNote]);

  return (
    <div
      className={css(`
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-right: 20px;
      `)}
    >
      <motion.div
        className={css(`
          width: 50px;
          height: 20px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
        `)}
        whileTap={{ scale: 0.8, opacity: 0.8 }}
        onClick={() => {
          setSongNote((n) => ({ ...n, note: n.note < 13 ? n.note + 1 : 13 }));
        }}
      >
        <FaChevronUp />
      </motion.div>
      <motion.div
        className={css(`
          width: 100px;
          height: 100px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          font-size: 50px;
          margin: 10px 0;
        `)}
        whileTap={{ scale: 0.8, opacity: 0.8 }}
        onClick={() => { playNote(); }}
      >
        {
          currentSongNote.note >= 0
            ? (
              `${notes[currentSongNote.note % notes.length]}${Math.trunc(currentSongNote.note / notes.length)}`
            )
            : '-'
        }
      </motion.div>
      <motion.div
        className={css(`
          width: 50px;
          height: 20px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
        `)}
        whileTap={{ scale: 0.8, opacity: 0.8 }}
        onClick={() => {
          if (currentSongNote.note == -1) {
            onRemove();
            return;
          }

          setSongNote((n) => ({ ...n, note: n.note > -1 ? n.note - 1 : -1 }));
        }}
      >
        {
          currentSongNote.note == -1
            ? <FaTimes />
            : <FaChevronDown />
        }
      </motion.div>
    </div>
  );
};

export default SongNoteComponent;
