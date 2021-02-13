const fs = require("fs");

// read files

// fs.readFile('./docs/blog.txt', (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data.toString());
//     }
// });

// console.log('last line')

// writing files

// fs.writeFile('./docs/blog.txt', 'Hello World', () => {
// console.log('file was written')
// });

// fs.writeFile('./docs/blog2.txt', 'Hello World', () => {
// console.log('file was written')
// });

// directories

// if (!fs.existsSync("./assets")) {
//   fs.mkdir("./assets", (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("directory was created");
//     }
//   });
// } else {
//     fs.rmdir('./assets', (err) => {
// if (err) {
//       console.log(err);
//     } else {
//       console.log("folder deleted");
//     }
//     });
// }

// deleting files
if (fs.existsSync("./docs/delete-me.txt")) {
    fs.unlink('./docs/delete-me.txt', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("file deleted");
    }
})
}
