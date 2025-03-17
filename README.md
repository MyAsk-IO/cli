MyAsk CLI
=================

MyAsk CLI allows users to interact with the MyAsk API directly from their local command line massively streamlining programmer workflow

![MyAsk Logo](MyAsk-social-logo.png)


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/claire.svg)](https://npmjs.org/package/claire)
[![Downloads/week](https://img.shields.io/npm/dw/claire.svg)](https://npmjs.org/package/claire)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @myask-io/cli
$ myask COMMAND
running command...
$ myask (--version)
@myask-io/cli/0.0.1 darwin-arm64 node-v22.14.0
$ myask --help [COMMAND]
USAGE
  $ myask COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`myask api:invitation:create [EMAIL]`](#myask-apiinvitationcreate-email)
* [`myask api:invitation:list`](#myask-apiinvitationlist)
* [`myask api:project:create`](#myask-apiprojectcreate)
* [`myask api:project:delete [PROJECTID]`](#myask-apiprojectdelete-projectid)
* [`myask api:project:set`](#myask-apiprojectset)
* [`myask api:project:show [PROJECTID]`](#myask-apiprojectshow-projectid)
* [`myask api:project:update`](#myask-apiprojectupdate)
* [`myask api:question:delete [QUESTIONID]`](#myask-apiquestiondelete-questionid)
* [`myask api:question:show [QUESTIONID]`](#myask-apiquestionshow-questionid)
* [`myask config`](#myask-config)
* [`myask help [COMMAND]`](#myask-help-command)
* [`myask info`](#myask-info)
* [`myask init`](#myask-init)
* [`myask plugins`](#myask-plugins)
* [`myask plugins:add PLUGIN`](#myask-pluginsadd-plugin)
* [`myask plugins:inspect PLUGIN...`](#myask-pluginsinspect-plugin)
* [`myask plugins:install PLUGIN`](#myask-pluginsinstall-plugin)
* [`myask plugins:link PATH`](#myask-pluginslink-path)
* [`myask plugins:remove [PLUGIN]`](#myask-pluginsremove-plugin)
* [`myask plugins:reset`](#myask-pluginsreset)
* [`myask plugins:uninstall [PLUGIN]`](#myask-pluginsuninstall-plugin)
* [`myask plugins:unlink [PLUGIN]`](#myask-pluginsunlink-plugin)
* [`myask plugins:update`](#myask-pluginsupdate)
* [`myask prompt`](#myask-prompt)

## `myask api:invitation:create [EMAIL]`

Send MyAsk invitation to a new user.

```
USAGE
  $ myask api:invitation:create [EMAIL]

ARGUMENTS
  EMAIL  Email of the user to invite to MyAsk

DESCRIPTION
  Send MyAsk invitation to a new user.
```

_See code: [src/commands/api/invitation/create.ts](https://github.com/MyAsk-IO/cli/blob/v0.0.1/src/commands/api/invitation/create.ts)_

## `myask api:invitation:list`

Show sent MyAsk invitations.

```
USAGE
  $ myask api:invitation:list

DESCRIPTION
  Show sent MyAsk invitations.
```

_See code: [src/commands/api/invitation/list.ts](https://github.com/MyAsk-IO/cli/blob/v0.0.1/src/commands/api/invitation/list.ts)_

## `myask api:project:create`

Create new project in MyAsk API

```
USAGE
  $ myask api:project:create [--name <value>] [--description <value>]

FLAGS
  --description=<value>  Project description
  --name=<value>         Project name

DESCRIPTION
  Create new project in MyAsk API
```

_See code: [src/commands/api/project/create.ts](https://github.com/MyAsk-IO/cli/blob/v0.0.1/src/commands/api/project/create.ts)_

## `myask api:project:delete [PROJECTID]`

Delete MyAsk project

```
USAGE
  $ myask api:project:delete [PROJECTID] [--list] [-p <value>]

ARGUMENTS
  PROJECTID  ID of project to delete

FLAGS
  -p, --projectId=<value>  ID of project to delete
      --list               List projects and select to delete

DESCRIPTION
  Delete MyAsk project
```

_See code: [src/commands/api/project/delete.ts](https://github.com/MyAsk-IO/cli/blob/v0.0.1/src/commands/api/project/delete.ts)_

## `myask api:project:set`

List users projects and set active project in MyAsk config.

```
USAGE
  $ myask api:project:set

DESCRIPTION
  List users projects and set active project in MyAsk config.
```

_See code: [src/commands/api/project/set.ts](https://github.com/MyAsk-IO/cli/blob/v0.0.1/src/commands/api/project/set.ts)_

## `myask api:project:show [PROJECTID]`

Show information for MyAsk project

```
USAGE
  $ myask api:project:show [PROJECTID] [--list] [-p <value>]

ARGUMENTS
  PROJECTID  ID of project to display

FLAGS
  -p, --projectId=<value>  ID of project to display
      --list               List projects and select to view

DESCRIPTION
  Show information for MyAsk project
```

_See code: [src/commands/api/project/show.ts](https://github.com/MyAsk-IO/cli/blob/v0.0.1/src/commands/api/project/show.ts)_

## `myask api:project:update`

Update project information in MyAsk API

```
USAGE
  $ myask api:project:update

DESCRIPTION
  Update project information in MyAsk API
```

_See code: [src/commands/api/project/update.ts](https://github.com/MyAsk-IO/cli/blob/v0.0.1/src/commands/api/project/update.ts)_

## `myask api:question:delete [QUESTIONID]`

Delete MyAsk question

```
USAGE
  $ myask api:question:delete [QUESTIONID] [--list] [-p <value>]

ARGUMENTS
  QUESTIONID  ID of question to delete

FLAGS
  -p, --questionId=<value>  ID of question to delete
      --list                List questions and select to delete

DESCRIPTION
  Delete MyAsk question
```

_See code: [src/commands/api/question/delete.ts](https://github.com/MyAsk-IO/cli/blob/v0.0.1/src/commands/api/question/delete.ts)_

## `myask api:question:show [QUESTIONID]`

Show details for MyAsk question

```
USAGE
  $ myask api:question:show [QUESTIONID] [--list] [-q <value>] [-s]

ARGUMENTS
  QUESTIONID  ID of question to display

FLAGS
  -q, --questionId=<value>  ID of question to display
  -s, --skipResponse        Do not include question response in output
      --list                List questions and select to view

DESCRIPTION
  Show details for MyAsk question
```

_See code: [src/commands/api/question/show.ts](https://github.com/MyAsk-IO/cli/blob/v0.0.1/src/commands/api/question/show.ts)_

## `myask config`

View current or set new MyAsk configuration values.

```
USAGE
  $ myask config [-h <value>] [-t <value>]

FLAGS
  -h, --host=<value>   Set API base URL
  -t, --token=<value>  Set MyAsk API key

DESCRIPTION
  View current or set new MyAsk configuration values.
```

_See code: [src/commands/config.ts](https://github.com/MyAsk-IO/cli/blob/v0.0.1/src/commands/config.ts)_

## `myask help [COMMAND]`

Display help for myask.

```
USAGE
  $ myask help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for myask.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.25/src/commands/help.ts)_

## `myask info`

Display current project and configuration information.

```
USAGE
  $ myask info

DESCRIPTION
  Display current project and configuration information.
```

_See code: [src/commands/info.ts](https://github.com/MyAsk-IO/cli/blob/v0.0.1/src/commands/info.ts)_

## `myask init`

Initialize MyAsk CLI.

```
USAGE
  $ myask init

DESCRIPTION
  Initialize MyAsk CLI.
```

_See code: [src/commands/init.ts](https://github.com/MyAsk-IO/cli/blob/v0.0.1/src/commands/init.ts)_

## `myask plugins`

List installed plugins.

```
USAGE
  $ myask plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ myask plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.31/src/commands/plugins/index.ts)_

## `myask plugins:add PLUGIN`

Installs a plugin into myask.

```
USAGE
  $ myask plugins:add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into myask.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the MYASK_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the MYASK_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ myask plugins:add

EXAMPLES
  Install a plugin from npm registry.

    $ myask plugins:add myplugin

  Install a plugin from a github url.

    $ myask plugins:add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ myask plugins:add someuser/someplugin
```

## `myask plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ myask plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ myask plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.31/src/commands/plugins/inspect.ts)_

## `myask plugins:install PLUGIN`

Installs a plugin into myask.

```
USAGE
  $ myask plugins:install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into myask.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the MYASK_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the MYASK_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ myask plugins:add

EXAMPLES
  Install a plugin from npm registry.

    $ myask plugins:install myplugin

  Install a plugin from a github url.

    $ myask plugins:install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ myask plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.31/src/commands/plugins/install.ts)_

## `myask plugins:link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ myask plugins:link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ myask plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.31/src/commands/plugins/link.ts)_

## `myask plugins:remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ myask plugins:remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ myask plugins:unlink
  $ myask plugins:remove

EXAMPLES
  $ myask plugins:remove myplugin
```

## `myask plugins:reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ myask plugins:reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.31/src/commands/plugins/reset.ts)_

## `myask plugins:uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ myask plugins:uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ myask plugins:unlink
  $ myask plugins:remove

EXAMPLES
  $ myask plugins:uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.31/src/commands/plugins/uninstall.ts)_

## `myask plugins:unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ myask plugins:unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ myask plugins:unlink
  $ myask plugins:remove

EXAMPLES
  $ myask plugins:unlink myplugin
```

## `myask plugins:update`

Update installed plugins.

```
USAGE
  $ myask plugins:update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.31/src/commands/plugins/update.ts)_

## `myask prompt`

Send a prompt to MyAsk API and retrieve a response.

```
USAGE
  $ myask prompt [-p <value>] [-F <value>...] [-c <value>...]

FLAGS
  -F, --inputFile=<value>...   Path to file(s) containing the question input
  -c, --contextIds=<value>...  Comma-separated list of context IDs
  -p, --prompt=<value>         Prompt to send

DESCRIPTION
  Send a prompt to MyAsk API and retrieve a response.

EXAMPLES
  $ myask prompt -p "How do I add ActiveAdmin to a Rails 7 app?"

  $ myask prompt -p "Refactor this file" -F path/to/src/file.ts

  $ myask prompt -F path/to/input.txt

  $ myask prompt -p "Help me combine these files:" -F path/to/file1.ts -F path/to/file2.ts

  $ myask prompt -p "Analyze this code" -c 123 -c 456
```

_See code: [src/commands/prompt.ts](https://github.com/MyAsk-IO/cli/blob/v0.0.1/src/commands/prompt.ts)_
<!-- commandsstop -->
