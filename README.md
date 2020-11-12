# watchtor

## Description

Some hot folder services doesn't work with network dir. This app works like a proxy. It listen a source directory for an addition of files which have a given extension.

If a new file addition is detected, then this file is moved to the destination directory

## Install

```bash
npm install watchtor -g
```

## Usage

```bash
$ watchtor --help

   watchtor x.y.z

   USAGE

     watchtor <fromDir> <toDir> <extension>

   ARGUMENTS

     <fromDir>        Files from directory          required
     <toDir>          Move to directory             required
     <extension>      filter on this extension      required

   GLOBAL OPTIONS

     -h, --help         Display help
     -V, --version      Display version
     --quiet            Quiet mode - only displays warn and error messages
     -v, --verbose      Verbose mode - will also output debug messages
```

## Example

```bash
$ watchtor /my/src/path /my/dst/path torrent
```

## Install as a Service

To install watchtor as a SystemD service, use the file `watchtor.service` given in this distribution. Substitute all variables "<...>" by their values.

```bash
$ sudo systemctl enable watchtor
$ sudo systemctl start watchtor
$ sudo systemctl stop watchtor
$ sudo systemctl restart watchtor
```