(function(){
    const $ = (selector, startNode=document) => 
                startNode.querySelector(selector);

    const $$ = (selector, startNode=document) => 
                startNode.querySelectorAll(selector);

    function pageModing(url, callbackFun ) {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      fetch(proxyurl + url)
      .then(response =>  response.text())
      .then(callbackFun)
      .catch(failure => console.log(failure));
    }

    function hideThem(context, bool= true) {
      let navs = $$("nav", context);
      ...Array.from($$("nav", context)).slice(-1)
      let toHide = [
        $("#UrlBar", context),
        $(".Console", context),
      ];
      console.log(toHide);
      for(let elem of toHide) {
        elem.hidden = bool;
      }
    }

    function expoGame(rawHTML) {
      const parser = new DOMParser();
      const newdoc = parser.parseFromString(rawHTML, "text/html");

      hideThem(newdoc);

      document.documentElement
            .replaceWith(newdoc.documentElement);
    }

    const url = "https://stackblitz.com/edit/elojs-chapter16-a-platformer-game-for-fun-ahihihihi-current-ver?embed=1&file=zzz_for_fking_stupid_preview_purpose_on_mobile_only_zzz.jsx&hideExplorer=1&hideNavigation=1&view=preview"; 

    pageModing(url, expoGame);

}());
