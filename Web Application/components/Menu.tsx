import React from 'react';
import Image from 'next/image';
import { css } from '@emotion/css';
import { motion } from 'framer-motion';

type SongNote = { id: string, note: number };

type Animal = {
  color: string,
  song: SongNote[],
};

type Animals = {
  bear: Animal,
  tiger: Animal,
  fox: Animal,
  owl: Animal,
};

type MenuProps = {
  animals: Animals,
  // eslint-disable-next-line no-unused-vars
  onChoose: (animalName: string) => void,
};

const Menu = ({ animals, onChoose }: MenuProps) => (
  <div
    className={css(`
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
    `)}
  >
    <div
      className={css(`
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      `)}
    >
      {
        Object.keys(animals).map((animalName) => (
          <motion.div
            key={animalName}
            className={css(`
              width: 100px;
              height: 100px;
              border-radius: 10px;
              background: ${animals[animalName].color};
            `)}
            onClick={() => {
              onChoose(animalName);
            }}
            whileTap={{ scale: 0.8, opacity: 0.8 }}
          >
            <Image src={`/${animalName}.png`} width={100} height={100} />
          </motion.div>
        ))
      }
    </div>
  </div>
);

export default Menu;

export type { Animals, Animal, SongNote };
