import "./App.css";
import { Component } from "react";
import Section from "./component/section/section";
import Sarchbar from "./component/Searchbar/Searchbar";
import ImageGallery from "./component/ImageGalleryItem/ImageGallery";
import Modalwindow from "./component/Modal/Modal";
class App extends Component {
  state = {
    imageName: "",
    showModal: false,
    option: {},
  };
  handelFormSubmit = (imageName) => {
    this.setState({ imageName });
  };
  togglemodal = (src, alt) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      option: { imageSrc: src, imageAlt: alt },
    }));
  };
  render() {
    return (
      <>
        <Section>
          <Sarchbar inputName={this.handelFormSubmit} />
        </Section>
        <Section>
          <ImageGallery
            imageName={this.state.imageName}
            onClick={this.togglemodal}
          />
        </Section>
        {this.state.showModal && (
          <Modalwindow
            onClose={this.togglemodal}
            src={this.state.option.imageSrc}
            alt={this.state.option.imageAlt}
          />
        )}
      </>
    );
  }
}

export default App;
