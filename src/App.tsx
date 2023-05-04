import { useState } from 'react'
import './App.css';
import Modal from './components/Modal';

const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  return (
    <div className='grid h-screen place-items-center'>
      <button onClick={handleButtonClick} className="bg-bezel-green hover:bg-green-800 text-white font-bold py-3 px-3 rounded-full">
        View Watch Details
      </button>
      {modalOpen && <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />}
    </div>
  );
};

export default App;