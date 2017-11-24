# Populater
Populate your MongoDB database.

## Requeriments
* You must use `mongoose` in your project to declare your models.
* You must specify a `.yml` file with the instances data:

#### EXAMPLE
```yaml
# .yml file
Profession:
  instances:
    - name: limpieza
    - name: cocina
    - name: informatica
    - name: jardineria
    - name: fontaneria
    - name: albañileria

Tag:
  config:
    - model: Profession
      queryMethod: findOne
      query: name
      from: professions
      setIn: professions
  instances:
    - name: chacha
      professions:
        - limpieza
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
