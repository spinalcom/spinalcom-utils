# spinalcom-utils

CLI for some Spinalcom utilities

## Install

```sh
sudo npm i -g https://github.com/spinalcom/spinalcom-utils.git
```

## Usage

```
Usage: spinalcom-utils [options] [command]

CLI for some Spinalcom utilities

Options:
  -V, --version                        output the version number
  -h, --help                           display help for command

Commands:
  clear                                clear the cache folder
  install [options] [module_names...]  install spinalcom dependencies
  help [command]                       display help for command
```

### install

#### install options

```
Usage: spinalcom-utils install [options] [module_names...]

install spinalcom dependencies

Options:
  --dry-run           Will do everything but stop at install (default: false)
  --only-spinalcom    Install only spinalcom dependencies (default: false)
  -s, --save          Save to package.json (default: true)
  -p, --path <path>   Path to folder containing package.json or the file itself (default: ".")
  -c, --cache <path>  path to cache directory (default: "/tmp/spinal-utils")
  -h, --help          display help for command
```

#### exemple usage

```sh
# install all
spinalcom-utils install

# install only spinalcom dependencies
spinalcom-utils install --only-spinalcom

# install one package
spinalcom-utils install spinal-core-connectorjs
spinalcom-utils install spinal-core-connectorjs@2.5.15
spinalcom-utils install https://github.com/spinalcom/spinal-core-connectorjs.git#2.5.15

# install multiple packages
spinalcom-utils install spinal-core-connectorjs spinal-core-connectorjs_type

# install --only-spinalcom also works here
spinalcom-utils install --only-spinalcom spinal-core-connectorjs

# to not save it in the package.json
spinalcom-utils install --only-spinalcom --save=false spinal-core-connectorjs

# ...
```

### How it works

1. Extract the Spinalcom dependencies from package.json and move it to a `spinalDependencies` attribut.
1. Recusivly `git clone` the dependencies, edit the package.json and do a `npm pack`.
1. Check for git branch confits
1. Install normal dependencies (if `--only-spinalcom` not activated)
1. Install all spinalcom' pack dependencies
1. Clean up and save

example package.json output

```json
{
  // ...
  "dependencies": {},
  "spinalDependencies": {
    "spinal-core-connectorjs": "spinal-core-connectorjs@2.5.15"
  }
}
```

It accecpt the following syntaxt:

```
"https://github.com/spinalcom/spinal-core-connectorjs#2.5.15"
"https://github.com/spinalcom/spinal-core-connectorjs.git#2.5.15"
"git+https://github.com/spinalcom/spinal-core-connectorjs.git"
"git+https://github.com/spinalcom/spinal-core-connectorjs.git#2.5.15"
"git@github.com:spinalcom/spinal-core-connectorjs.git"
"git+git@github.com:spinalcom/spinal-core-connectorjs.git#2.5.15"
"git@github.com:spinal-core-connectorjs.git#2.5.15"
"github:spinalcom/spinal-core-connectorjs"
"spinal-core-connectorjs"
"spinal-core-connectorjs#2.5.15"
"spinal-core-connectorjs@2.5.15"
...
```

**in the exemple `#2.5.15` or `@2.5.15` are git tag or commit name.**

### Handle conflits

If 2 or more packgage have dependencies with 2 or more commit version. The following message will happen.

```
Some conflit found, edit file /path/to/package.json/folder/spinalconflit.json
```

At this point for each modules in the file you only need to change the `forceCommit` attribut to a git commit / tag name, then run install again.

```sh
"forceCommit": "EDIT_ME",
# for exemple to
"forceCommit": "2.5.14",
```

Exemple `spinalconflit.json` output

```json
{
  "spinal-core-connectorjs": {
    "forceCommit": "EDIT_ME",
    "found": {
      "2.5.14": ["spinal-browser-spinaltwin"],
      "": [
        "spinal-env-viewer-task-service",
        "spinal-model-graph",
        "spinal-models-building-elements",
        "spinal-core-connectorjs_type",
        "spinal-models-ticket",
        "spinal-models-documentation"
      ]
    }
  }
}
```

**The program will find error even if `2.5.14` is the `main`/`master` branch.**
**Here the `""` is the `master` / `main` branch**
