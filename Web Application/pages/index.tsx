import React, { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { css } from '@emotion/css';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import Menu, { Animals } from '../components/Menu';
import MusicEditor from '../components/MusicEditor';

type PageProps = { animals: Animals };

const Page: NextPage<PageProps> = ({ animals }) => {
  const [currentAnimal, setCurrentAnimal] = useState('');
  const [currentAnimals, setAnimals] = useState<Animals>(animals.bear ? animals : {
    bear: { color: '#968059', song: [] },
    tiger: { color: '#ebdd56', song: [] },
    fox: { color: '#f7cb68', song: [] },
    owl: { color: '#e084f9', song: [] },
  });

  return (
    <>
      <div
        className={css(`
          background: #FBD1A2;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        `)}
      >
        {
          currentAnimal == ''
            ? (
              <Menu
                animals={currentAnimals}
                onChoose={(animalName) => {
                  setCurrentAnimal(animalName);
                }}
              />
            )
            : (
              <MusicEditor
                animalName={currentAnimal}
                onSubmit={(current, value) => {
                  setAnimals((a) => ({ ...a, [current]: { ...a[current], song: value } }));
                }}
                onBack={() => {
                  setCurrentAnimal('');
                }}
                currentSong={currentAnimals[currentAnimal].song}
              />
            )
        }
        <motion.div
          className={css(`
            position: absolute;
            bottom: 20px;
            height: 40px;
            border-radius: 10px;
            width: 200px;
            background: #e49366;
            display: flex;
            align-items: center;
            justify-content: center;
          `)}
          whileTap={{ scale: 0.8, opacity: 0.8 }}
          onClick={async () => {
            const res = await fetch('/api/content', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(currentAnimals),
            });
            console.log(currentAnimals);

            const content = await res.json();

            if (content.status == 'ok') {
              console.log('Сохранено!');
            }
          }}
        >
          Сохранить
        </motion.div>
        <motion.div
          className={css(`
            position: absolute;
            bottom: 20px;
            right: 20px;
            height: 40px;
            border-radius: 10px;
            width: 40px;
            background: #e49366;
            display: flex;
            align-items: center;
            justify-content: center;
          `)}
          whileTap={{ scale: 0.8, opacity: 0.8 }}
          onClick={async () => {
            const animalsSongs = {};
            let canPlay = false;
            Object.keys(currentAnimals).forEach((animalName) => {
              const animal = currentAnimals[animalName];
              const newSong = animal.song.map((songNote) => {
                if (songNote.note == -1) return null;
                const audio = new Audio(`/${animalName}${songNote.note}.mp3`);
                audio.load();
                audio.addEventListener('canplaythrough', () => {
                  canPlay = true;
                });
                return audio;
              });

              animalsSongs[animalName] = newSong;
            });

            const intervalFunc = () => {
              if (canPlay) {
                Object.keys(animalsSongs).forEach((animalName) => {
                  animalsSongs[animalName].forEach((audio, index) => {
                    setTimeout(() => {
                      if (audio != null) audio.play();
                    }, 500 * index);
                  });
                });
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                clearInterval(interval);
              }
            };

            const interval = setInterval(intervalFunc, 500);
          }}
        >
          <FaPlay />
        </motion.div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:5000/api/content', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  const animals = await res.json();

  const props: PageProps = { animals: animals ?? {} };

  return ({ props });
};

export default Page;
