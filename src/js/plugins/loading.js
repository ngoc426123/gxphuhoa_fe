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
    $(window).on('open-loading', this.openLoading);
    $(window).on('close-loading', this.closeLoading);
  }

  openLoading = () => {
    const {
      clsActive
    } = this.options;

    this.$element.addClass(clsActive);
  }

  closeLoading = () => {
    const {
      clsActive
    } = this.options;

    this.$element.removeClass(clsActive);
  }
}