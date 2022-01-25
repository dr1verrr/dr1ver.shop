const Modal = props => {
  return props.show ? (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>{props.title}</div>
        <div className='modal-body'>
          <p>{props.children}</p>
        </div>
        <div className='modal-footer'>
          <button className='modal-button' onClick={props.onClose} style={{ width: '100%', display: 'block' }}>
            Close
          </button>
        </div>
      </div>
      <style jsx>{`
        .modal {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          background: rgba(29, 31, 33, 0.95);
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 100;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          padding: 15px;
        }

        * {
          font-size: 1.5rem;
        }

        .modal-content {
          margin: 0 auto;
          display: flex;
          background: rgba(255, 255, 255, 0.75);
          color: #000;
          flex-direction: column;
          justify-content: center;
          min-width: fit-content;
          width: 50vw;
          padding: 3rem 10vw;
          border-radius: 15px;
          text-align: center;
        }

        .modal-button {
          padding: 0.5rem 2rem;
        }
      `}</style>
    </div>
  ) : null
}

export default Modal
