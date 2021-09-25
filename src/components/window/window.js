import { Component } from "react";
import classes from './window.module.scss';

class Window extends Component {

  render() {
    return (
      <section className={classes.window}>
        <header>
          Window
          <button 
            type="button"
            className={classes.closer}
            onClick={this.props.handlerCloseWin}
          >&times;</button>
        </header>
        <main>
          {this.props.children}
        </main>
        
      </section>
    );
  }
}

export default Window;