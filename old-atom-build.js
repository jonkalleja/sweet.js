module.exports = {
  cmd: 'npm test',
  sh: true
};
// module.exports = {
//   cmd: 'npm run build && npm run test:smoke',
//   sh: true,
//   // env: {
//   //   FORCE_COLOR: '0',
//   //   NPM_CONFIG_COLOR: 'never'
//   // },
//   functionMatch: function(output) {
//     var absPath = /\((\/.+):(\d+):(\d+)\)/;
//     var relPath = /\(([^(]+):(\d+):(\d+)\)/;
//     var messageStartMatch = /\s*\d\.\s*(.+)/;
//     var matches = [];
//
//     let currentMessage;
//     let messageFlag = false;
//     output.split(/\n/).forEach(function (line) {
//       if (messageFlag === true) {
//         currentMessage += '\n' + line;
//         messageFlag = false;
//       } else {
//         let messageStart = messageStartMatch.exec(line);
//         if (messageStart != null) {
//           currentMessage = messageStart[1];
//           messageFlag = true;
//         }
//       }
//       let errorMatch = absPath.exec(line);
//       let filePath = errorMatch != null ? errorMatch[1] : null;
//       if (errorMatch == null) {
//         errorMatch = relPath.exec(line);
//         filePath = errorMatch != null ? 'build/test/' + errorMatch[1] : null;
//       }
//
//       if (errorMatch != null && !/.*node_modules.*/.test(filePath) && !/.*assertions\.js.*/.test(filePath)) {
//         matches.push({
//           file: filePath,
//           line: errorMatch[2],
//           col: errorMatch[3],
//           message: currentMessage
//         });
//       }
//     });
//     return matches
//   },
//   targets: {
//     runDebug: {
//       cmd: 'node debug.js',
//       name: "run debug"
//     }
//   }
// };
