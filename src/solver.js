'use strict';

class Solver {
  constructor(sudoku) {
    this.sudoku = sudoku;

    this.moveForward = true;
  }

  async solve() {
    let loops = 0;
    this.boxes = document.querySelector(".ninexnine_wrapper").childNodes;

    //for (let i = 2; i < 27; i++) {
    for (let i = 2; i < 81; i++) {
      loops++;
      if (loops > 45000) {
        console.log("Too many loops, exiting");
        break;
      }

      // Skip over 'default' boxes
      if (this.boxes[i].classList.contains("default") && !this.moveForward) {
        //console.log(`Loop: ${loops} - i: ${i} - moving to ${i - 2}`);
        i -= 2;
        this.clearAhead(i+2);
        continue;
      }

      //await this.func2(i);
      this.moveForward = this.elSol(this.boxes[i]);

      if (!this.moveForward) {
        
        //
        // Move back two spaces
        //console.log(`Loop: ${loops} - i: ${i} - moving to ${i - 2}`);
        i -= 2;
        this.clearAhead(i+2);
      }

    }

    console.log(`Completed in ${loops} loops`);
  }

  func2(i, x) {
    let self = this;
    return new Promise(resolve => setTimeout(function() {
      self.moveForward = self.elSol(self.boxes[i]);

     resolve();
    }, 10));
  }

  elSol(boxEl, x) {
    //let boxEl = document.querySelector(".row"+i+".col"+j);
    
    if (boxEl.classList.contains("default"))
      return true;

    if (parseInt(boxEl.childNodes[0].value)) {
      boxEl.childNodes[0].value++;
      if (boxEl.childNodes[0].value > 9) {
        boxEl.childNodes[0].value = "";
        return false;
      }
    } else {
      boxEl.childNodes[0].value = 1;
    }

    while (!this.sudoku.error.isValidStar(boxEl.classList) &&
       boxEl.childNodes[0].value < 9) {
      boxEl.childNodes[0].value++;
    }

    if (!this.sudoku.error.isValidStar(boxEl.classList)) {
      boxEl.childNodes[0].value = "";
      return false;
    } else {
      return true;
    }
  }

  clearAhead(i) {
    for (; i < 81; i++) {
      let col = (i % 9) + 1;
      let row = (Math.floor(i / 9)) + 1;
      let boxEl = document.querySelector(".row"+row+".col"+col);

      if (boxEl.classList.contains("default"))
        continue;

      boxEl.childNodes[0].value = "";
    }
  }

}

export default Solver;