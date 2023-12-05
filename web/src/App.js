import logo from './logo.svg';
import './App.css';
import 'bulma/css/bulma.min.css';
import { Button } from 'react-bulma-components';
import { PartialSection } from './components/PartialSection';
import { Bttn } from './components/Bttn';
import React, { useState } from 'react';
import { Discard } from './components/Discard';

function App() {
  const [BttnIconGithub, setBttnIconGithub] = useState('fa-brands fa-github-alt');
  const [BttnIconLinkedin, setBttnIconLinkedin] = useState('fa-brands fa-linkedin-in');
  const [BttnIconEmail, setBttnIconEmail] = useState('fa-regular fa-envelope');
  const [BttnIconDemarcar, setBttnIconDemarcar] = useState('fa-solid fa-expand');
  const [BttnIconUpload, setBttnIconUpload] = useState('fa-solid fa-upload');
  const [BttnIconFinish, setBttnIconFinish] = useState('fa-solid fa-circle-check');

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
              <Bttn userStatedIcon={BttnIconUpload} background='is-danger'></Bttn>
              <Bttn userStatedIcon={BttnIconDemarcar} background='is-warning'></Bttn>
              <Bttn userStatedIcon={BttnIconFinish} background='is-primary'></Bttn>
            </div>

          </header>

          <div id='cards'>

          </div>

          <Discard />

        </PartialSection>
        <PartialSection>
          {/* Conteúdo do segundo PartialSection */}
        </PartialSection>
      </section>
      <aside>
        {/* Conteúdo do aside */}
      </aside>
    </div>
  );
}

export default App;
