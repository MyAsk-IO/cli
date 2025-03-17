# CLaiRE CLI Installation and Configuration

## Installing

- #### NPMjs
	- `npm install -g @claire-ac/cli`

## Initialize the CLI
- `claire init`

## Configuring
- `claire config`
- `claire config -t {API_TOKEN}`

	- find your CLaiRE API token in your admin dashboard `https://claire.ac/admin`

## Creating Projects
- `claire api:project:create`
```
 - name
 - description
 - ai_model
 - system_message (optional)
```

## Setting Current Project
- `claire api:project:set`
	- no flags necessary; choose project from list to set as current project for API

## Sending AI Prompts
- `claire ask`
- `claire ask -p "prompt goes here"`
- `claire ask -F path/to/input/file`
	- if no flags supplied `claire` prompts you on the command line

- `claire ask` allows you to supply both a prompt using the `-p` tag as well as an input file using `-F`
- `claire ask` allows you to supply multiple input files using the following format:
	- `claire ask -F path/to/input1 -F path/to/input2`
- `claire ask -p "Analye the following files, refactor if necessary, and merge into a single source file" -F path/to/source1 -F path/to/source 2`

## View API Data
- `claire api:project:show --list`
- `claire api:project:show {PROJECT_ID}`
- `claire api:question:show --list`
- `claire api:question:show {QUESTION_ID}`

## Invite Users to CLaiRE
- `claire api:invitation:create {USER_EMAIL}`
	- if no `{USER_EMAIL}` supplied `claire` will prompt for one on the command line
