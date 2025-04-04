import React, { useContext, useState } from 'react';
import EditorContainer from './EditorContainer';
import InputConsole from './InputConsole';
import OutputConsole from './OutputConsole';
import Navbar from './Navbar';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { languageMap, PlaygroundContext } from '../../context/PlaygroundContext';
import { ModalContext } from '../../context/ModalContext';
import Modal from '../../components/Modal';
import axios from 'axios';

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: ${({ isFullScreen }) => isFullScreen ? '1fr' : '2fr 1fr'};
  min-height: ${({ isFullScreen }) => isFullScreen ? '100vh' : 'calc(100vh - 4.5rem)'};
  @media (max-width: 768px){
    grid-template-columns: 1fr;
  }
`;

const Consoles = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
`;

const Playground = () => {
  const { folderId, playgroundId } = useParams();
  const { folders, savePlayground } = useContext(PlaygroundContext);
  const { isOpenModal, openModal, closeModal } = useContext(ModalContext);
  const { title, language, code } = folders[folderId].playgrounds[playgroundId];

  const [currentLanguage, setCurrentLanguage] = useState(language);
  const [currentCode, setCurrentCode] = useState(code);
  const [currentInput, setCurrentInput] = useState('');
  const [currentOutput, setCurrentOutput] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Save the code to the context
  const saveCode = () => {
    savePlayground(folderId, playgroundId, currentCode, currentLanguage);
  };

  // Function to call local backend for offline execution
  const runCodeOffline = async (language, code, input) => {
    try {
      const response = await axios.post('http://localhost:5000/run', {
        language,
        code,
        input,
      });
      return response.data.output;
    } catch (error) {
      return error.response?.data?.error || 'Error occurred while running code.';
    }
  };

  // Function to execute the code
  const runCode = async () => {
    openModal({
      show: true,
      modalType: 6,
      identifiers: {
        folderId: '',
        cardId: '',
      }
    });

    const language_id = currentLanguage; // Using currentLanguage directly
    const source_code = currentCode;
    const stdin = currentInput;

    // Call the local backend
    const output = await runCodeOffline(language_id, source_code, stdin);
    setCurrentOutput(output);

    closeModal();
  };

  const getFile = (e, setState) => {
    const input = e.target;
    if ('files' in input && input.files.length > 0) {
      placeFileContent(input.files[0], setState);
    }
  };

  const placeFileContent = (file, setState) => {
    readFileContent(file)
      .then((content) => {
        setState(content);
      })
      .catch((error) => console.log(error));
  };

  function readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }

  return (
    <div>
      <Navbar isFullScreen={isFullScreen} />
      <MainContainer isFullScreen={isFullScreen}>
        <EditorContainer
          title={title}
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
          currentCode={currentCode}
          setCurrentCode={setCurrentCode}
          folderId={folderId}
          playgroundId={playgroundId}
          saveCode={saveCode}
          runCode={runCode}
          getFile={getFile}
          isFullScreen={isFullScreen}
          setIsFullScreen={setIsFullScreen}
        />
        <Consoles>
          <InputConsole
            currentInput={currentInput}
            setCurrentInput={setCurrentInput}
            getFile={getFile}
          />
          <OutputConsole
            currentOutput={currentOutput}
          />
        </Consoles>
      </MainContainer>
      {isOpenModal.show && <Modal />}
    </div>
  );
};

export default Playground;
