// reads wuchale locale files and writes them to the browser
// extension-native format

import * as fs from 'node:fs';
import * as path from 'node:path';

const dirPath = 'src/locales'
const filenames = fs.readdirSync(dirPath);

function format_as_key(msgid) {
  // Only ASCII [a-z], [A-Z], [0-9] and "_" are allowed
  return msgid.replaceAll(' ', '_').replaceAll(/[^a-zA-Z0-9_]+/g, '')
}

filenames.forEach((filename) => {
  if (!filename.endsWith('.po')) {
    return
  }
  const filePath = path.join(dirPath, filename);
  const stat = fs.lstatSync(filePath);

  if (stat.isFile()) {
    const locale = filename.split('.po')[0]
    const extension_messages_format = {}
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    for (let i=0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('msgid')) {
        const msgid = format_as_key(line.split('msgid "')[1].slice(0, -1))
        if (!msgid) {
          continue
        }
        extension_messages_format[msgid] = null;
      } else if (line.startsWith('msgstr')) {
        let msgstr = line.split('msgstr "')[1].slice(0, -1)
        if (!msgstr) {
          continue
        }
        const msgid = format_as_key(lines[i-1].split('msgid "')[1].slice(0, -1))
        const placeholders = msgstr.match(/\{(\d+)\}/g)
        if (placeholders) {
          for (let i=0; i < placeholders?.length; ++i) {
            let match = placeholders[i]
            msgstr = msgstr.replace(placeholders[i], `$${match[1]}$`)
          }
        } 
        extension_messages_format[msgid] = {message: msgstr}
        if (placeholders) {
          // "helloUser": {
          //   "message": "Hello, $USER$!",
          //   "placeholders": {
          //     "user": {
          //       "content": "$1",
          //       "example": "John"
          //     }
          //   }
          // }
          extension_messages_format[msgid].placeholders = {}
          placeholders.forEach(match => {
            const identifier = match[1]
            // in wuchale all identifiers are always integers
            extension_messages_format[msgid].placeholders[identifier] = {content: '$'+(parseInt(identifier) + 1)}
          })
        }
      }
    }
    fs.mkdirSync(`_locales/${locale}`, {recursive: true});
    fs.writeFileSync(`_locales/${locale}/messages.json`, JSON.stringify(extension_messages_format), 'utf-8')
  }
});
console.log('wrote _locales from .po files')
