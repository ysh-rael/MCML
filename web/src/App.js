import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.min.css';
import { Button } from 'react-bulma-components';
import { PartialSection } from './components/PartialSection';
import { Bttn } from './components/Bttn';
import React, { useState } from 'react';
import { Discard } from './components/Discard';
import { Card } from './components/Card';
import { DropArea } from './components/DropArea';
import { BttnBar } from './components/BttnBar';
import { Modal } from './components/Modal';
import { FormRequestImage } from './components/FormRequestImage';

function App() {
  const [BttnIconGithub, setBttnIconGithub] = useState('fa-brands fa-github-alt');
  const [BttnIconLinkedin, setBttnIconLinkedin] = useState('fa-brands fa-linkedin-in');
  const [BttnIconEmail, setBttnIconEmail] = useState('fa-regular fa-envelope');
  const [BttnIconDemarcar, setBttnIconDemarcar] = useState('fa-solid fa-expand');
  const [BttnIconUpload, setBttnIconUpload] = useState('fa-solid fa-upload');
  const [BttnIconFinish, setBttnIconFinish] = useState('fa-solid fa-circle-check');
  const [BttnIconPlus, setBttnIconPlus] = useState('fa-solid fa-plus');
  const [ColorDropArea, setColorDropArea] = useState('#C1C1C1')
  const [NameDropArea, setNameDropArea] = useState('')
  const [DropsArea, setDropsArea] = useState([])
  const [tags, setTags] = useState([]);
  const [ModalActive, setModalActive] = useState(false);
  const [ModelContent, setModelContent] = useState(null)

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
                let data = 'initial'
                try {
                  const t = data = await fetch('https://pexels.com/pt-br/procurar/carros/')
                  data = 'data'
                } catch (err) {
                  data = err
                }

                setModalActive(true); setModelContent(<FormRequestImage setModalActive={setModalActive}/>)
              }} />
              <Bttn userStatedIcon={BttnIconDemarcar} background='is-warning' onClick={() => { setModalActive(true); setModelContent(`Ola mundo2`) }} />
              <Bttn userStatedIcon={BttnIconFinish} background='is-primary' onClick={() => { setModalActive(true); setModelContent(`Ola mundo3`) }} />
            </div>

          </header>

          <div id='cards'>
            <Card principal={true} />
            <Card />
          </div>

          <Discard />

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
