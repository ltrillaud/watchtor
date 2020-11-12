#! /usr/bin/env node

import { version } from './package.json'
import { watch } from 'chokidar'
import { Observable } from 'rxjs'
import { filter } from 'rxjs/operators'
import { basename, join } from 'path'
import prog from 'caporal'
import mv from 'mv'

try {
  prog.version(version)
    .argument('<fromDir>', 'Files from directory')
    .argument('<toDir>', 'Move to directory')
    .argument('<extension>', 'filter on this extension')
    .action((args) => {
      console.log(`watching ${args.extension} files from ${args.fromDir} to ${args.toDir}`)

      new Observable<string>(observer => {
        watch(args.fromDir, { ignoreInitial: true, depth: 1, })
          .on('add', path => observer.next(path))
      }).pipe(filter(path => path.endsWith(args.extension)))
        .subscribe(from => {
          const to = join(args.toDir, basename(from))
          const msg = `Move file from (${from}) to(${to})`
          mv(from, to, err => {
            if (err) {
              console.log(`${msg} failed`, err.toString())
            } else {
              console.log(`${msg} succeed`)
            }
          })
        })
    })
  prog.parse(process.argv)
} catch (error) {
  console.error(error)
  process.exit(-1)
}
