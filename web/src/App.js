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
import { BttnBar } from './components/BttnBra';

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

  return (
    <div className="App">

      <section>
        <PartialSection>
          <header>

            <div>
              <Bttn userStatedIcon={BttnIconGithub} animation={true}></Bttn>
              <Bttn userStatedIcon={BttnIconLinkedin} animation={true}></Bttn>
              <Bttn userStatedIcon={BttnIconEmail} animation={true}></Bttn>
            </div>

            <div>
              <Bttn userStatedIcon={BttnIconUpload} background='is-info'></Bttn>
              <Bttn userStatedIcon={BttnIconDemarcar} background='is-warning'></Bttn>
              <Bttn userStatedIcon={BttnIconFinish} background='is-primary'></Bttn>
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
