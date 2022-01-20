import { Component } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.scss'
const modalRoot = document.querySelector('#modal-root')

class Modalwindow extends Component {
  state = {
    window: '',
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handelKeyDown)
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handelKeyDown)
  }
  handelKeyDown = (event) => {
    if (event.code === 'Escape') {
      this.props.onClose(null, null)
    }
  }
  handelBackdropClick = (event) => {
    console.log(event.currentTarget)
    if (event.currentTarget === event.target) {
      this.props.onClose(null, null)
    }
  }
  render() {
    return createPortal(
      <div className={styles.ModalBack} onClick={this.handelBackdropClick}>
        <div className={styles.Modal} onClick={this.handelBackdropClick}>
          <button type="button" onClick={this.handelBackdropClick}>
            Close
          </button>
          <img
            className={styles.imageModule}
            src={this.props.src}
            alt={this.props.alt}
          />
        </div>
      </div>,
      modalRoot,
    )
  }
}

export default Modalwindow
