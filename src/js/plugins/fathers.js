@Plugin({
  options: {
    pluginName: 'Fathers',
    dataFathersInput: '[data-fathers-input]',
    dataFathersItems: '[data-fathers-item]',
    dataFathersNoResult: '[data-fathers-no-result]',
    clsHidden: 'd-none',
    timeDebounce: 300,
  }
})
export default class Fathers {
  init() {
    this.initDOM();
    this.initState();
    this.handleEvent();
  }

  initDOM() {
    const {
      dataFathersInput,
      dataFathersItems,
      dataFathersNoResult
    } = this.options;

    this.$input = this.$element.find(dataFathersInput);
    this.$items = this.$element.find(dataFathersItems);
    this.$noResult = this.$element.find(dataFathersNoResult);
  }

  initState() {
    this.state = {
      keywork: '',
      debounce: false,
    }
  }

  handleEvent() {
    const { pluginName } = this.options;

    this.$input
      .off(`keyup.${pluginName}`)
      .on(`keyup.${pluginName}`, this.handleEventChangeInput.bind(this));
  }
  
  handleEventChangeInput() {
    const { timeDebounce } = this.options;
    const value = this.$input.val();

    this.state.keywork = value;
    clearTimeout(this.state.debounce);
    this.state.debounce = setTimeout(() => {
      this.handleSearchFather();
    }, timeDebounce);
  }

  handleSearchFather() {
    const { clsHidden } = this.options;
    const keywork = this.state.keywork;
    const fathersLength = this.$items.length;

    this.$items.removeClass(clsHidden);

    if (keywork.length <= 0) {
      return;
    }

    this.$items.each((_, item) => {
      const dataKeywork = $(item).data('keywork').toUpperCase();
      const valueUpper = keywork.toUpperCase();
      const regex = new RegExp(`(${valueUpper})`, 'g');

      regex.exec(dataKeywork) === null && $(item).addClass(clsHidden);
    });

    const $fatherNotShow = this.$items.filter(`.${clsHidden}`);
    const fatherNotShowlength = $fatherNotShow.length;

    fatherNotShowlength >= fathersLength
      ? this.$noResult.removeClass(clsHidden)
      : this.$noResult.addClass(clsHidden);
  }
}