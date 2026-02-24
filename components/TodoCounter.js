class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = 0; 
    this._total = 0; 
    this._total = todos.length;
    this._completed = todos.filter(todo => todo.completed).length;
    this._updateText();
  }

    updateCompleted = (increment) => {
        this._completed += increment ? 1 : -1;
        this._updateText();
  };
 
  updateTotal = (increment) => {
    this._total += increment ? 1 : -1;
    this._updateText();
  };

  _updateText() {
    const completedText = this._completed === 1 ? "1 task" : `${this._completed} tasks`;
    const totalText = this._total === 1 ? "1 task" : `${this._total} tasks`;
    this._element.textContent = `Showing ${completedText} out of ${totalText} completed`;
  }
}

export default TodoCounter;
