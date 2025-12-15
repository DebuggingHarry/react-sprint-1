import { createContext, useContext, useState, useCallback } from 'react';
import Card from './Card.js';
import { ActionTray } from './Actions.js';
import './Modal.css';

const ModalContext = createContext();

function ModalDisplay() {
  const context = useContext(ModalContext);
  if (!context) return null;
  
  const { modal: { show, title, content, actions } } = context;

  return (
    show
      ? <div className="ModalOverlay">
          <main className = "ModalPane">
            <Card>
              <header>
                <p>{title}</p>
              </header>
              <main className="ModalContent">
                {content}
              </main>
              {
                actions && (
                  <div className="ModalActions">
                    <ActionTray>
                      {actions.map(action => action)}
                    </ActionTray>
                  </div>
                )
              }
            </Card>
          </main>
        </div>
      : null
  );
}

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
};

function Provider({ children }) {
  const [modal, setModal] = useState({ show: false, title: null, content: null, actions: null });

  const handleModal = useCallback((newModal) => {
    newModal.show ? setModal(newModal) : setModal({show: false, title: null, content: null, actions: null});
  }, []);
    
  return (
    <ModalContext.Provider value={{ modal, handleModal }}>
      <ModalDisplay />
      {children}
    </ModalContext.Provider>
  );
}

export default Provider;
export { useModal };