import $http from 'axios';

const ajax_url = {"url":"https://gxphuhoa.org/gxphuhoa/wp-admin/admin-ajax.php"};

@Plugin({
  options: {
    pluginName: 'Category',
    dataListNews: '[data-list-news]',
    dataLoadMore: '[data-load-more]',
  }
})
export default class Category {
  init() {
    this.initDom();
    this.initEvent();
  }

  initDom () {
    const {
      dataListNews,
      dataLoadMore
    } = this.options;

    this.$listNews = this.$element.find(dataListNews);
    this.$loadMore = this.$element.find(dataLoadMore);
  }

  initEvent () {
    const {
      pluginName
    } = this.options;

    // CLICK LOAD MORE
    this.$loadMore
      .off(`click.${pluginName}`)
      .on(`click.${pluginName}`, (event) => this.loadMore(event));
  }

  loadMore (event) {
    console
    event.preventDefault();

    const cate = this.$loadMore.data('cate');
    const offset = this.$loadMore.data('page');
    const action = 'category_readmore';
    
    $http({
      method: 'post',
      url: ajax_url.url,
      data: { action, offset, cate }
    }).then(data => {
      console.log(data);
    });
  }
}