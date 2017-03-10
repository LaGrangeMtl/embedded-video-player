# embedded-video-player
Construit un player vidéo avec un iFrame, un bouton close et les shares du vidéo. Le player se reconstruit à chaque click sur un élément déclencheur. Il n'y a donc qu'une seule instance de ce player dans une page donnée.

---

## Fonctionnement :

* Importer le fichier SCSS dans votre projet : `@import 'path/to/_video-player;`
* Importer le JS dans votre projet : `import VideoPlayer from 'path/to/VideoPlayer';`
* Changer la valeur de `FB_APP_ID` pour l'app ID Facebook du client
* Initialiser le JS : `VideoPlayer.init();`

Le sélecteur CSS pour les éléments déclencheurs est par défaut `[data-video-btn]`.
 
On met le ID Youtube comme ceci : `<div data-video-btn="YOUTUBE_ID"></div>`.

S'il s'agit d'un Viméo, simplement utiliser l'attribut `data-is-vimeo="true"` comme ceci : `<div data-video-btn="VIMEO_ID" data-is-vimeo="true"></div>`. 

