---
title: "Cogner à son ordi"
date: 2016-04-12
tags:
  - "objets"

---

Ces temps-ci, j'ai l'occasion d'utiliser un Thinkpad (X230 pour les amateurs). Ces ordinateurs portables sont dotés d'une petite lampe en haut de l'écran, pour l'éclairer quand la lumière ambiante est trop faible. Un raccourci clavier (Fn+Espace) permet de l'éteindre et de l'allumer instantanément.

Très naturellement je me suis dit : «  hey avec ça on peut communiquer en morse  ». Je n'ai pas été le premier à y penser : voici [un outil](https://github.com/timocramer/thinklight-fun) qui convertit du texte en morse et l'envoie directement à la lampe, et [le témoignage](http://lists.freebsd.org/pipermail/freebsd-questions/2006-May/123456.html) de quelqu'un dont la lampe envoie S.O.S en boucle et qui n'arrive pas à l'arrêter.

En faisant mes recherches, je suis tombé sur un hack assez différent mais encore plus jouissif : utiliser l'accéléromètre d'un ordi portable pour détecter quand on toque dessus. Certains ordinateurs ont un capteur de ce genre pour détecter une chute et désactiver le disque dur, mais on peut en tirer parti pour [jouer](http://lifehacker.com/181203/gaming-with-the-macbooks-accelerometer), [enregistrer les séismes](https://www.technologyreview.com/s/409999/laptops-as-earthquake-sensors/) ou détecter des coups. On peut ainsi sortir son ordinateur de veille avec un [rythme de coups qu'on aura défini](http://www.ibm.com/developerworks/library/l-knockage/index.html#resources).

![knockToUnlock](/assets/images/knockToUnlock.png)

L'idée du _secret knock_ a été reprise par [des apps](http://www.gizmag.com/sesame-smart-lock-secret-knock/36275/) de déverrouillage de porte. Plus largement, on peut taper pour allumer l'écran de son [smartphone LG](http://www.lg.com/fr/knockcode), pour déverrouiller son ordinateur [depuis son téléphone](http://www.knocktounlock.com/) (en photo), etc.

J'aime le fait qu'on utilise un senseur interne, conçu pour détecter les mouvements propres de l'appareil, pour un usage externe. J'aime aussi le fait que l'ordinateur devient entièrement un bouton : on peut appuyer dessus n'importe où.

J'aime enfin l'idée de détourner les composants de banals ordinateurs pour en faire des interfaces tangibles dignes du MIT Media Lab. Il y a certainement plein d'usages marrants et de chorégraphies complexes à imaginer, à partir d'un bête toc-toc et d'une simple lampe. Jeu musical ? Discussions discrètes en salle de classe ? Détecter l'humeur des gens suivant les chocs que reçoit l'appareil ?

Et puis ça me permet de citer le roman [Cryptonomicon](https://en.wikipedia.org/wiki/Cryptonomicon), et une scène de dénouement où le héros, prisonnier et convaincu que sa cellule et son ordinateur sont pleins de mouchards, passe des informations vitales en code morse via le voyant CAPS LOCK de son ordinateur :

> How does Randy know that there is a site called Golgotha, and how does he know its real coordinates? His computer told him using Morse code. Computer keyboards have LEDs on them that are essentially kind of useless: one to tell you when NUM LOCK is on, one for CAPS LOCK, and a third one whose purpose Randy can't even remember. And for no reason other than the general belief that every aspect of a computer should be under the control of hackers, someone, somewhere, wrote some library routines called XLEDS that make it possible for programmers to turn these things on and off at will. And for a month, Randy's been writing a little program that makes use of these routines to output the contents of a text file in Morse code, by flashing one of those LEDs. And while all kinds of useless crap has been scrolling across the screen of his computer as camouflage, Randy's been hunched over gazing into the subliminal channel of that blinking LED, reading the contents of the decrypted Arethusa intercepts. One of which says: THE PRIMARY IS CODE NAMED GOLGOTHA. COORDINATES OF THE MAIN DRIFT ARE AS FOLLOWS: LATITUDE NORTH (etc.)
