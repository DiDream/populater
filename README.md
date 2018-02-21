# Populater
Populate your MongoDB database.

## Requeriments
* You must use `mongoose` in your project to declare your models.
* You must specify a `.yml` or `.js` file with the instances data:

#### EXAMPLE
```yaml
# .yml file
Profession:
  - name: limpieza
  - name: cocina
  - name: informatica
  - name: jardineria
  - name: fontaneria
  - name: albañileria
```

## Usage
```bash
$ ./node_modules/.bin/populater --app index --file populate.yml --reset
```
* --app   : the main file of your project.
* --file  : file with the instances data.
* --reset : option to reset your database before create the instances.

## TODO
* improve README
