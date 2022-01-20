import { Component } from 'react'
import styles from './Searchbar.module.scss'
import { nanoid } from 'nanoid'
import { FiSearch } from 'react-icons/fi'

class Sarchbar extends Component {
  state = {
    imageName: '',
  }

  handelNameInput = (event) => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() })
  }

  handelSubmit = (event) => {
    event.preventDefault()
    if (this.state.imageName.trim() === '') {
      return
    }
    this.props.inputName(this.state.imageName)
    this.setState({ imageName: '' })
  }

  render() {
    return (
      <div className={styles.Searchbar}>
        <header className={styles.searchbar}>
          <form onSubmit={this.handelSubmit} className={styles.SearchForm}>
            <button type="submit" className={styles.SearchFormbutton}>
              <FiSearch />
            </button>
            <input
              id={nanoid()}
              className={styles.SearchForminput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              onChange={this.handelNameInput}
            />
          </form>
        </header>
      </div>
    )
  }
}

export default Sarchbar
