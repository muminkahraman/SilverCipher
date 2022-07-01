# SilverCipher# Silver Cipher (Version1)
#### Ce projet a été développé par : Cassaigne Antoine, Kahraman Mumin, Leconte Tony, Reynaud Ludovic, Serron Vincent, Thouvenin Sébastien 
## Introduction
Ce projet à pour but de créer une solution de chiffrement de bout en bout. Nous utilisons pour cela une méthode de chiffrement avec clé de session. Le fichier en lui même est chiffré avec l'algorithme **aes-256-cbc**. Le mot de passe est chiffré par un chiffrement asymétrique qu'est le **RSA**.
## Prérequis (liste des logiciels prérequit et leur versions...)
Pour lancer le projet, il faudra d'abord installer certains logiciels : 
 - NodeJS 16.15

Certaines librairies doivent aussi êtres installés. Cependant nous avons mis en place un utilitaire qui les installe automatiquement avec une seule commande. Pour informations, les librairies en question sont les suivantes.

 - concurrently : 5.0.0
 - electron : 8.3.0
 - electron-builder :  22.1.0
 - wait-on : 3.3.0
 - @emotion/react : 11.9.3
 - @emotion/styled : 11.9.3
 - @mui/material : 5.8.6
 - @mui/x-data-grid : 5.12.3
 - axios : 0.27.2
 - cors : 2.8.5
 - cross-env : 6.0.3
 - electron-is-dev : 1.1.0
 - electron-store : 8.0.2
 - form-data : 4.0.0
 - fs : 0.0.1
 - securityreact : 18.2.0
 - react-dom : 18.2.0
 - react-router-dom : 5.1.2
 - react-scripts : 3.2.0

## Arborescence du projet

 - API
   - .public
     - silver-cipher
       - data
         - enc_files
         - enc_keys
         - enc_message
         - public_keys
   - *index.js*
   - *package.json*
 - APP_Client
   - Keys
     - *public.pem*
     - *private.pem*
   - public
   - src
     - **pages ....**
   - temp 
   - *package.json*
 - Documentation
 - *.gitignore*
 - *Readme.md*

## Les installation (comment installer les modules etc...)
La commande **npm start** qui va être expliquée dans la partier suivante installe les modules nécessaires avant de lancer l'application.
## Le lancement (les commandes nécessaire au lancement )
Pour lancer l'application il suffit d'ouvrir une console dans le répertoire **APP_client** et de lancer la commande **npm start**.
## La navigation (ce que l'on retrouve sur le site, comment s'inscrire/se connecter, ... )
Pour pouvoir commencer à utilier l'application, il faut tout d'abord se créer un compte dans l'utilitaire de connexion/inscription qui s'affiche au lancement de l'application. 
une fois que le compte est crée, l'utilisateur est invité à se rendre à l'accueil.
Une fois que l'utilisateur est à l'accueil, il paux naviguer à l'aide du menu sur la gauche.
il peut accéder à sa boite de réception, à sa boite d'envoi, à son message brouillon, créer un nouveau message et enfin les paramètres. 
Dans la boite de réception, il est possible de consulter la liste des messages recus et de télécharger les fichiers qui correspondent à ces messages.
dans la boite d'envoi, il est possible de voir la liste des envois.
dans le broiuillon, il est possible de voir le dernier message que nous avons commencé à écrire mais que nous n'avons pas envoyé.
Dans les paramètres, il est possible de supprimer son compte et de vérouiller son compte.
dans la partie nouveau message, il est possible d'envoyer un message à un destinataire en renseignant son nom d'utilisateur, le fichier que l'on veut envoyer et aussi un message si on le souhaite.
