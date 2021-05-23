import $http from 'axios';

@Plugin({
  options: {
    pluginName: 'Single',
    dataListAudioOther: '[data-list-audio-other]',
    dataLoadMore: '[data-load-more]',
    dataSingleFixed: '[data-single-fixed]',
    dataTitleGroup: '[data-title-group]',
    clsActive: 'active',
  }
})
export default class Single {
  init() {
    this.initDom();
    this.initEvent();
  }

  initDom () {
    const {
      dataListAudioOther,
      dataLoadMore,
      dataSingleFixed,
      dataTitleGroup
    } = this.options;

    this.$listAudioOther = this.$element.find(dataListAudioOther);
    this.$loadMore = this.$element.find(dataLoadMore);
    this.$singleFixed = this.$element.find(dataSingleFixed);
    this.$titleGroup = this.$element.find(dataTitleGroup);
  }

  initEvent () {
    const {
      pluginName
    } = this.options;

    // CLICK LOAD MORE
    this.$loadMore
      .off(`click.${pluginName}`)
      .on(`click.${pluginName}`, (event) => this.loadMore(event));

    // FINXED SINGLE
    $(window).on('scroll', () => this.onsingleFixed());

    $(window).on('load', () => this.initContent());
  }

  async loadMore (event) {
    event.preventDefault();
    $(window).trigger('open-loading');

    const cate = parseInt(this.$loadMore.attr('data-cate'));
    const perpage = parseInt(this.$loadMore.attr('data-perpage'));
    const offset = parseInt(this.$loadMore.attr('data-offset'));
    const nettOffset = offset + perpage;
    const url = window.api.posts;
    const params = { perpage, cate, offset };
    const method = 'get';
    const _data = await $http({ method, params, url });

    if ( _data.data.length > 0 ) {
      this.renderItem(_data.data);
      this.$loadMore.attr('data-offset', nettOffset);
    } else {
      this.$loadMore.remove();
    }

    $(window).trigger('close-loading');
  }

  renderItem (data) {
    data.forEach(item => {
      const tmp = `<div class="col">
                  <div class="news">
                    <div class="img"><a href="${item.link}" title="${item.title}" style="background-image:url(${item.img});"></a>
                    </div>
                    <div class="caption">
                      <div class="date">${item.date}</div>
                      <div class="tend"><a href="${item.link}" title="${item.title}">${item.title}</a>
                      </div>
                    </div>
                  </div>
                </div>`;
      this.$listAudioOther.append(tmp);
    });
  }

  onsingleFixed () {
    const {
      clsActive
    } = this.options;
    const singleoffsetTop = this.$element.offset().top;
    const singleTitleHeight = this.$titleGroup.outerHeight();
    const offset4Show = singleoffsetTop + singleTitleHeight;
    const offsetWin = $(window).scrollTop();

    ( offsetWin > offset4Show ) && this.$singleFixed.addClass(clsActive);
    ( offsetWin < offset4Show ) && this.$singleFixed.removeClass(clsActive);
  }

  initContent () {
    this.$element.find('.the-content img').each(function(){
      $(this).attr({
        'width': '',
        'height': '',
        'style': '',
      });
    });
  }
}