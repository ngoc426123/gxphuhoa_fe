@Plugin({
  options: {
    pluginName: 'Menumobile',
    clsIconMenu: '.iconMenu',
    clsDivmm: '.divmm',
    clsClose: '.close-mmenu',
    clsOverlay: '.divmmbg',
    clsSubmenu: '.sub',
    clsOpenMenu: 'show',
    clsOpenSubMenu: 'active',
    tmpSubMenu: '<span class="sub"></span>',
    timeSlide: 300,
  }
})
export default class MenuMobile {
  init() {
    this.initDom();
    this.initEvent();
  }

  initDom () {
    const {
      clsDivmm,
      clsIconMenu,
      clsClose,
      clsOverlay
    } = this.options;

    this.$iconMenu = $('html').find(clsIconMenu);
    this.$divMM = this.$element.find(clsDivmm);
    this.$closeMenu = this.$element.find(clsClose);
    this.$overlay = this.$element.find(clsOverlay);
    this.$menu = this.$element.find('ul');
  }

  initEvent () {
    const {
      pluginName,
      clsSubmenu
    } = this.options;

    // INIT SUB MENU
    $(window)
      .on('load', () => this.initSubmenu());

    // EVENT TOGGLE MENU
    this.$iconMenu.add(this.$closeMenu).add(this.$overlay)
      .off(`click.${pluginName}`)
      .on(`click.${pluginName}`, () => this.toggleMenu());

    // EVENT TOGGLE SUB MENU
    $('html')
      .on('click', `.menuMobile ${clsSubmenu}`, (event) => this.toggleSubMenu(event));
  }

  initSubmenu () {
    const {
      tmpSubMenu
    } = this.options;

    this.$menu.find('li').each((index, item) => {
      const isSubmenu = $(item).find('ul li').length > 0;

      isSubmenu && $(item).append(tmpSubMenu);
    });
  }

  toggleMenu () {
    const {
      clsOpenMenu
    } = this.options;
    const isShow = this.$divMM.hasClass(clsOpenMenu);

    !isShow && this.$divMM.addClass(clsOpenMenu);
    isShow && this.$divMM.removeClass(clsOpenMenu);
  }

  toggleSubMenu (event) {
    const {
      clsOpenSubMenu,
      timeSlide
    } = this.options;
    const target = $(event.currentTarget);
    const parent = target.parent('li');
    const isShow = parent.hasClass(clsOpenSubMenu);

    parent.siblings().removeClass(clsOpenSubMenu);
    parent.siblings().find('ul').stop().slideUp(timeSlide);

    !isShow && parent.addClass(clsOpenSubMenu);
    !isShow && parent.find('ul').stop().slideDown(timeSlide);
    isShow && parent.removeClass(clsOpenSubMenu);
    isShow && parent.find('ul').stop().slideUp(timeSlide);
  }
}