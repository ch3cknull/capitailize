#! node
const fs = require('fs')
const path = require('path')
const { exit } = require('process')
const { opendir } = require('fs/promises')
const { capitalize } = require('./src/replace')



const handleError = (err) => {
  if (err) {
    console.error(err);
    throw Error(err)
  } 
}

async function rewriteSingleFile(fileName) {
  fs.readFile(fileName, (err, data) => {
    handleError(err)
    console.log(`[+] rewriting ${fileName}.`);
    fs.writeFile(fileName, capitalize(data.toString()), (err) => {
      handleError(err)
    })
  })
}

async function rewriteDir(dirName) {
  try {
    const dir = await opendir(dirName);
    for await (const dirent of dir) {
      const fullPath = path.join(dirName, dirent.name)
      console.log(fullPath);
      (dirent.isDirectory()) ? rewriteDir(fullPath) : rewriteSingleFile(fullPath)
    }
  } catch (err) {
    handleError(err)
  }
}

const args = [... new Set(process.argv.slice(2))]

if (args.length == 0) {
  const usage = `\nusage: node index.js [... filePath]\n`
  console.log(usage)
  console.log('[-] No File Path')
  exit()
}

args.forEach(fileName => {
  if (!fs.existsSync(fileName)) {
    console.log(`[-] ${fileName} Not Exist, Ignore It`)
    return
  }
  const stat = fs.statSync(fileName)
  if (stat.isDirectory()) {
    rewriteDir(fileName)
  }
  else if (stat.isFile(fileName)) {
    rewriteSingleFile(fileName)
  }
})
