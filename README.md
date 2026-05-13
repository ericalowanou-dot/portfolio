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
