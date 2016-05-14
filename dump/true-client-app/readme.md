Purpose
--------
Client html, css, and other static resources can be stored as compressed strings on clients browser.
This will allow a seamless user experience at the cost of size of local storage available for app data .

Tech stack :
Version 1  : Prototype
          - lz-string : for compressions (results 444ms to compress 82 kb of sample-storage-string/01-js-css-html.html to 42 kb, and 42ms to decompress)
           https://github.com/pieroxy/lz-string

           - angular local storage : for using local storage in angular's way.
           https://github.com/grevory/angular-local-storage

