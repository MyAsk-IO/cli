# CLaiRE CLI Installation and Configuration

## Installing

- #### NPMjs
	- `npm install -g @myask-io/cli`

## Initialize the CLI
- `myask init`

## Configuring
- `myask config`
- `myask config -t {API_TOKEN}`

	- find your CLaiRE API token in your admin dashboard `https://myask.io/admin`

## Creating Projects
- `myask api:project:create`
```
 - name
 - description
 - ai_model
 - system_message (optional)
```

## Setting Current Project
- `myask api:project:set`
	- no flags necessary; choose project from list to set as current project for API

## Sending AI Prompts
- `myask ask`
- `myask ask -p "prompt goes here"`
- `myask ask -F path/to/input/file`
	- if no flags supplied `myask` prompts you on the command line

- `myask ask` allows you to supply both a prompt using the `-p` tag as well as an input file using `-F`
- `myask ask` allows you to supply multiple input files using the following format:
	- `myask ask -F path/to/input1 -F path/to/input2`
- `myask ask -p "Analye the following files, refactor if necessary, and merge into a single source file" -F path/to/source1 -F path/to/source 2`

## View API Data
- `myask api:project:show --list`
- `myask api:project:show {PROJECT_ID}`
- `myask api:question:show --list`
- `myask api:question:show {QUESTION_ID}`

## Invite Users to CLaiRE
- `myask api:invitation:create {USER_EMAIL}`
	- if no `{USER_EMAIL}` supplied `myask` will prompt for one on the command line
