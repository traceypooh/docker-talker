
// Idea to extend reveal.js to allow for a single boilerplate line at the top of any .md file
// and have it do everything from there.
// This also very nicely allows the file to be served locally in a browser
// (avoids blocked AJAX attempt for an external .md file load, etc.)


// Utility - loads an external JS file and append it to the head, from:
// http://zcourts.com/2011/10/06/dynamically-requireinclude-a-javascript-file-into-a-page-and-be-notified-when-its-loaded
function require(file, callback){
  var script = document.createElement('script');
  script.src = file;
  script.type = 'text/javascript';
  script.onload = callback; // real browsers
  script.onreadystatechange = function() { if (_this.readyState == 'complete') callback() }; //MSIE
  document.getElementsByTagName('head')[0].appendChild(script);
}


require('reveal.js/lib/js/head.min.js', function() {

  // slurp the current body text (markdown) into a string,
  // then rebuild the body with the proper markup wrapping the markdown
  var body = document.getElementsByTagName('body')[0];
  var markdown = body.innerHTML;

  // for bulleted lists..
  // handle 'soft tabs' of TAB getting turned into 2 SPACE chars
  markdown = (markdown
    .replace(/\n  \- /g, '\n\t- ')
    .replace(/\n    \- /g, '\n\t\t- ')
    .replace(/\n      \- /g, '\n\t\t\t- ')
    .replace(/\n        \- /g, '\n\t\t\t\t- '))

  body.innerHTML = ('\n\
    <div class="reveal">\n\
    	<div class="slides">\n\
    		<section data-markdown  data-separator="^---">\n\
    			<textarea data-template id="inject">\n\
          </textarea>\n\
  			</section>\n\
  		</div>\n\
  	</div>\n\
  ');

  document.getElementById('inject').innerHTML = markdown;


  var meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
  document.getElementsByTagName('head')[0].appendChild(meta);


  // get the styles and theme in place
  var loads = [
    'reveal.js/css/reveal.css',       // main CSS
    'sky.css',                        // desired theme
    'reveal.js/lib/css/zenburn.css',  // for syntax highlighting of code
    (window.location.search.match( /print-pdf/gi ) ? // printing and PDF exports
      'reveal.js/css/print/pdf.css' :
      'reveal.js/css/print/paper.css')
  ];
  for (var idx in loads) {
		var link = document.createElement('link');
		link.href = loads[idx];
		link.rel = 'stylesheet';
		link.type = 'text/css';
		document.getElementsByTagName('head')[0].appendChild(link);
  }


  require('reveal.js/js/reveal.js', function(){
    // More info about config & dependencies:
    // - https://github.com/hakimel/reveal.js#configuration
    // - https://github.com/hakimel/reveal.js#dependencies
    Reveal.initialize({controls: true,  progress: false,  history: true,  center: true,  margin: 0.1,
      dependencies: [
        { src: 'reveal.js/plugin/markdown/marked.js' },
        { src: 'reveal.js/plugin/markdown/markdown.js' },
        { src: 'reveal.js/plugin/notes/notes.js', async: true },
        { src: 'reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } }
      ]
    });
  });
});
