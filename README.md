# Portfolio — Eric ALOWANOU

Site statique pour **GitHub Pages**.

## Modifier le site

- **Coordonnées / réseaux** : `js/config.js`
- **Texte, projets** : `index.html`
- **Apparence** : `css/style.css`
- **Photo** : voir `images/LISEZMOI.txt`

## Exporter en PDF

Bouton **Exporter en PDF** → dialogue d’impression du navigateur → imprimante **Enregistrer au format PDF**.

Pour garder les **couleurs** (colonne orange, barres de langues, encadrés) : active **Couleur** et **Graphiques d’arrière-plan** / *Background graphics* (Chrome : « Plus de paramètres »). Le CSS utilise `print-color-adjust: exact`, mais le navigateur peut encore retirer les fonds sans cette option.

### Sur mobile

C’est possible via **Partager** ou **Imprimer** puis **Enregistrer au PDF** (selon appareil et navigateur). Le confort et les options « arrière-plan » varient ; sur ordinateur le résultat est en général plus prévisible.

## Déploiement GitHub Pages

Réglages du dépôt → **Pages** → branche `main`, dossier `/ (root)`.

## Prévisualisation locale

```bash
npx --yes serve .
```

## Propriété intellectuelle

Ce dépôt est placé sous **tous droits réservés** : voir le fichier [`LICENSE`](LICENSE). Cela formalise que la réutilisation commerciale ou la copie substantielle sans ton accord n’est pas autorisée.

**Limite technique importante** : un dépôt **public** sur GitHub est lisible et clonable par n’importe qui (c’est le principe de l’open source / de la visibilité). Un fichier `LICENSE` ne « verrouille » pas le code : il pose un **cadre juridique**. Pour que le code ne soit **pas visible** par le public, il faut un dépôt **privé** (GitHub permet des dépôts privés selon ton offre) et ne partager l’accès qu’aux personnes invitées.

Pour un **portfolio** destiné aux recruteurs, un dépôt public est souvent voulu ; pour des projets sensibles ou commerciaux, privilégie **privé** + contrats / NDA avec les clients.
