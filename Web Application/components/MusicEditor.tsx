import React, { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { motion } from 'framer-motion';
import { FaArrowCircleLeft, FaPlus } from 'react-icons/fa';
import { SongNote } from './Menu';
import SongNoteComponent from './SongNote';

type MusicEditorProps = {
  animalName: string
  // eslint-disable-next-line no-unused-vars
  onSubmit: (animalName: string, song: SongNote[]) => void,
  onBack: () => void,
  currentSong: SongNote[],
};

const uid = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const MusicEditor = ({
  animalName,
  onSubmit,
  onBack,
  currentSong,
}: MusicEditorProps) => {
  const [song, setSong] = useState<{ current: SongNote[] }>({ current: currentSong });

  useEffect(() => {
    onSubmit(animalName, song.current);
  }, [song.current]);

  return (
    <>
      <motion.div
        className={css(`
          position: absolute;
          left: 10px;
          top: 10px;
          width: 50px;
          height: 50px;
          border-radius: 20px;
          background: #e49366;
          display: flex;
          align-items: center;
          justify-content: center;
        `)}
        whileTap={{ scale: 0.8, opacity: 0.8 }}
        onClick={() => { onSubmit(animalName, song.current); onBack(); }}
      >
        <FaArrowCircleLeft size="25px" />
      </motion.div>
      <div
        className={css(`
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 10px;
          font-size: 25px;
        `)}
      >
        {animalName}
      </div>
      <div
        className={css(`
          display: flex;
          height: 100%;
          align-items: center;
          overflow-x: overlay;
          padding: 0 20px;
        `)}
      >
        {song.current.map((songNote, index) => (
          <SongNoteComponent
            // eslint-disable-next-line react/no-array-index-key
            key={songNote.id}
            onChange={(value) => {
              setSong((s) => {
                const tempSong = [...s.current];
                tempSong[index] = value;

                return ({ current: tempSong });
              });
            }}
            onRemove={() => {
              setSong((s) => {
                const tempSong = [...s.current];
                tempSong.splice(index, 1);

                return ({ current: tempSong });
              });
            }}
            animalName={animalName}
            songNote={songNote}
          />
        ))}
        <motion.div
          className={css(`
            display: flex;
            height: 100%;
            align-items: center;
            justify-content: center;
            background: white;
            border-radius: 10px;
            width: 100px;
            height: 100px;
            min-width: 100px;
          `)}
          whileTap={{ scale: 0.8, opacity: 0.8 }}
          onClick={() => {
            setSong((s) => ({ current: [...s.current, { id: uid(), note: -1 }] }));
          }}
        >
          <FaPlus size="30px" />
        </motion.div>
      </div>
    </>
  );
};

export default MusicEditor;
