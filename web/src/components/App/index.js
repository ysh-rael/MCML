import './css/index.css';
import 'bulma/css/bulma.min.css';
import { Button } from 'react-bulma-components';
import { PartialSection } from '../PartialSection';
import { Bttn } from '../Bttn';
import React, { useEffect, useState } from 'react';
import { Discard } from '../Discard';
import { Card } from '../Card';
import { DropArea } from '../DropArea';
import { BttnBar } from '../BttnBar';
import { Modal } from '../Modal';
import { FormRequestImage } from '../FormRequestImage';
import { usePrevImg, useRequestImg } from './hooks';
import { BttnIconDemarcar, BttnIconEmail, BttnIconFinish, BttnIconGithub, BttnIconLinkedin, BttnIconPlus, BttnIconUpload } from './constants';
import { Fork } from '../Fork';

export function App() {

  const [ColorDropArea, setColorDropArea] = useState('#C1C1C1')
  const [NameDropArea, setNameDropArea] = useState('')
  const [DropsArea, setDropsArea] = useState([])
  const [tags, setTags] = useState([]);
  const [ModalActive, setModalActive] = useState(false);
  const [ModelContent, setModelContent] = useState(null)
  const [RequestImg, setRequestImg] = useState(null)
  const [ImgIndex, setImgIndex] = useState(0)
  const [Imgs, setImgs] = useState([])
  const [UrlPrevImg, setUrlPrevImg] = useState(null)
  const [OptionsRequestImg, setOptionsRequestImg] = useState(null)

  useRequestImg({ RequestImg, setImgIndex, setImgs, Imgs, setUrlPrevImg })

  usePrevImg({ ImgIndex, Imgs, UrlPrevImg, OptionsRequestImg, setRequestImg })

  return (
    <div className="App">
      <Modal ModalActive={ModalActive} setModalActive={setModalActive} ModelContent={ModelContent} setModelContent={setModelContent} />

      <section>
        <PartialSection>
          <header>

            <div>
              <Bttn userStatedIcon={BttnIconGithub} animation={true} onClick={() => window.location = 'https://github.com/ysh-rael'}></Bttn>
              <Bttn userStatedIcon={BttnIconLinkedin} animation={true} onClick={() => window.location = 'https://www.linkedin.com/in/yshrael-pimentel-76502820b/'}></Bttn>
              <Bttn userStatedIcon={BttnIconEmail} animation={true} onClick={() => window.location = 'mailto:ysp.rael@gmail.com'}></Bttn>
            </div>

            <div>
              <Bttn userStatedIcon={BttnIconUpload} background='is-info' onClick={async () => {
                setModalActive(true);
                setModelContent(<FormRequestImage setModalActive={setModalActive} setModelContent={setModelContent} setRequestImg={setRequestImg} setOptionsRequestImg={setOptionsRequestImg} />)
              }} />
              <Bttn userStatedIcon={BttnIconDemarcar} background='is-warning' onClick={() => { setModalActive(true); setModelContent(<Fork img={Imgs[ImgIndex - 1]} />) }} />
              <Bttn userStatedIcon={BttnIconFinish} background='is-primary' onClick={() => { setModalActive(true); setModelContent(`Ola mundo3`) }} />
            </div>

          </header>

          <div id='cards'>
            <Card principal={true} img={Imgs[ImgIndex - 1]} />
            <Card img={Imgs[ImgIndex]} />
          </div>

          <Discard ImgIndex={ImgIndex} setImgIndex={setImgIndex} />

        </PartialSection>

        <PartialSection>

          <div id='box_tool'>
            <input className='input' type='text' placeholder='label for your drop box' value={NameDropArea} onChange={(event) => setNameDropArea(event.target.value)} />
            <input className='' type='color' value={ColorDropArea} onChange={(event) => setColorDropArea(event.target.value)}></input>
            <Bttn animation={false} userStatedIcon={BttnIconPlus} onClick={event => {
              const boxDrop = document.getElementById('box_drop')

              if (!boxDrop) return;
              setDropsArea(prev => [...prev, <DropArea label={NameDropArea} background={ColorDropArea} tags={tags} setTags={setTags} />])
            }} />
          </div>

          <div id='box_drop'> {DropsArea} </div>
        </PartialSection>
      </section>

      <aside className='tagAside'>
        <BttnBar />

        <div id='box_tags'>
          {tags}
        </div>
      </aside>

    </div>
  );
}

export default App;
