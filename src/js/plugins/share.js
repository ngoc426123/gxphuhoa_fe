@Plugin({
  options: {
    pluginName: 'Share',
    dataShareFacebook: '[data-share-facebook]',
  }
})
export default class Share {
  init() {
    this.initDom();
    this.initEvent();
  }

  initDom () {
    const {
      dataShareFacebook
    } = this.options;

    this.$shareFacebook = this.$element.find(dataShareFacebook);
  }

  initEvent () {
    const {
      pluginName
    } = this.options;

    // SHARE FACEBOOK
    this.$shareFacebook
      .off(`click.${pluginName}`)
      .on(`click.${pluginName}`, (event) => this.shareFacebook(event));
  }

  shareFacebook (event) {
    event.preventDefault();

    FB.ui({
      method: 'share',
      href: ajax_url.url_share,
    }, function(response){});
  }
}