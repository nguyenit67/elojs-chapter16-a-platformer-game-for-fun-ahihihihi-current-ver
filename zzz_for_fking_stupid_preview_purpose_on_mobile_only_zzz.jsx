<iframe src=>

// (function(){
//     const $ = (selector, startNode=document) => 
//                 startNode.querySelector(selector);

//     const $$ = (selector, startNode=document) => 
//                 startNode.querySelectorAll(selector);

//     function pageModing(url, callbackFun ) {
//       const proxyurl = "https://cors-anywhere.herokuapp.com/";
//       fetch(proxyurl + url)
//       .then(response =>  response.text())
//       .then(callbackFun)
//       .catch(failure => console.log(failure));
//     }

//     function hideThem(context, bool= true) {
//       let navs = $$("nav", context); // return NodeList
//       let toHide = [
//         $("#UrlBar", context),
//         $(".Console", context),
//         navs[ navs.length - 1 ]
//       ];
//       console.log(toHide);
//       for(let elem of toHide) {
//         elem.hidden = bool;
//       }
//     }

//     function expoGame(rawHTML) {
//       const parser = new DOMParser();
//       const newdoc = parser.parseFromString(rawHTML, "text/html");

//       //hideThem(newdoc);

//       document.documentElement
//             .replaceWith(newdoc.documentElement);
//     }

//     const url = "https://www.w3schools.com/tags/tag_img.asp"; 

//     pageModing(url, expoGame);

// }());