@Plugin({
  options: {
    clsActive: 'active'
  }
})
export default class Loading {
  init() {
    this.initEvent();
  }

  initEvent () {
    $(window).on('open-loading', () => this.openLoading());
    $(window).on('close-loading', () => this.closeLoading());
  }

  openLoading () {
    const {
      openLoading
    } = this.options;

    this.$element.addClass(openLoading);
  }

  closeLoading () {
    const {
      openLoading
    } = this.options;

    this.$element.removeClass(openLoading);
  }
}