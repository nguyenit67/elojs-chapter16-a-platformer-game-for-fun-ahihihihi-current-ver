<style>
  body * {
    width: 95vw;
    height: 100vh;
    border: none;
    overflow: hidden;    
  }
</style>

<body>
 <object data="http://stackblitz.com/edit/elojs-chapter16-a-platformer-game-for-fun-ahihihihi?embed=1&file=zzz_for_fking_stupid_preview_purpose_on_mobile_only_zzz.xhtml&hideExplorer=1&hideNavigation=1&view=preview" type="text/html">
        <script>
  const $ = (selector, startNode=document) => startNode.querySelector(selector);
  const $$ = (selector, startNode=document) => startNode.querySelectorAll(selector);
  function hideng(bool) {
    const toHide = [
      $("#UrlBar"),
      $(".Console"),
      ...Array.from($$("nav")).slice(-1)
    ];
    console.log(toHide);
    for(let elem of toHide) {
      elem.hidden = bool;
    }
  }
  setTimeout(() => {
    hideng(true);
  }, 20000);
  
</script>
    </object>

</body>