# Aide mémoire pour contribuer

## Pour contribuer à Broutille

📍
- Le site Web  
📎 [broutille.oisiflorus.com](http://broutille.oisiflorus.com/)  
  
- L'adresse du dépôt Github (où se trouve le code source)  
📎 [github.com/oisiflorus/broutille](https://github.com/oisiflorus/broutille)  

- Pour s'organiser, je vais ajouter des idées d'articles :
📎 [Liste des tâches](https://github.com/oisiflorus/broutille/projects/1)

### Comment corriger une erreur ou modifier un thé ?

Par exemple, pour modifier une _origine_ ou un _cultivar_ qui ne correspond pas

Il faut rejoindre le fichier qui contient les thés :  
📎 [oisiflorus/api-tea - /data/yaml/teas.yaml](https://github.com/oisiflorus/api-tea/blob/master/data/yaml/teas.yaml)

On commence par cliquer sur  le stylo : <svg class="octicon octicon-pencil" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 011.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z"></path></svg>

On fait les modifications et en bas de la page on renseigne un message de _commit_ pour expliquer les modifications - par exemple :

> ajoute la ville et la province pour le _Anxi TieGuanYin_

Puis on clique sur le bouton vert : _Commit Change_
---
lien: aide-memoire
titre: Aide Mémoire
description: >
  un petit guide pour Thais et Ya-lin
---



### Ajouter un nouveau thé ?

Il faut rejoindre le fichier qui contient les thés :  
📎 [oisiflorus/api-tea - /data/yaml/teas.yaml](https://github.com/oisiflorus/api-tea/blob/master/data/yaml/teas.yaml)

On peut _copier/coller_ un thé existant et changer les données (comme modèle vous pouvez prendre : 安溪鐵觀音 qui est pour l'instant le plus complété)

Pour mieux comprendre, chaque thé comporte des rubriques qui sont formatées comme suit :

```
- zn: <idéogramme non-simplifié>
  province: <province>
  town: <ville(s)>
  elevation: <altitude(s)>
  temperature: <température(s) d'infusion recommandée>
  fermentation: <pourçentage de fermentation>
  cultivar: <cultivar(s)>
  harvest: <season(s)>
  picking: <type(s) de ceuillette>
  brewing:
    - type: <type d'infusion>
      quantity: <quantité>
      duration: <durée d'infusion en seconde>
      times: <nombre d'infusion>
```

Les espaces utilisés pour formater sont important, c'est eux qui structurent les données.
