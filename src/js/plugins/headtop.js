@Plugin({
  options: {
  }
})
export default class HeadTop {
  init() {
    $(".iAbout").fancybox({
      type: 'ajax',
      toolsbar: false,
      smallBtn: true,
      baseClass: "introAbout",
    });
  }
}