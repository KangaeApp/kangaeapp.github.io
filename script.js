console.log('hi!')
const { Octokit } = require("@octokit/core");
// var octokit;
var CryptoJS = require("crypto-js");
// const base64 = require('base-64');
// const auth_encrypted = 'U2FsdGVkX1+DEuTUckU8SWPMMm65nhMLY0Ap80IM/XO43tESbJSXV1eSTqMKN+ZTJJ0DRtHspidsub3qJNNpaQ==';
// var authKey = localStorage.getItem("authKey") || '';
// var isDecrypted = localStorage.getItem("isDecrypted") || false;
// var attemptForm = document.querySelector("#attempt");
// var ethanForm = document.querySelector("#ethan");
// ethanForm.hidden = true;

// if (isDecrypted) {
//   octokit = new Octokit({auth: authKey});
//   attemptForm.hidden = true;
//   ethanForm.hidden = false;
// }

// attemptForm.addEventListener("submit", function(e) {
//   e.preventDefault();
//   console.log(attemptForm.password.value)
//   attempt_decryption(attemptForm.password.value);
// });
// ethanForm.addEventListener("submit", function(e) {
//   e.preventDefault();
//   console.log(ethanForm.text.value)
//   create_or_update_post(ethanForm.text.value);
// });

// function attempt_decryption(password) {
//   if (isDecrypted) return;
//   var bytes  = CryptoJS.AES.decrypt(auth_encrypted, password);
//   var decryptAttempt = bytes.toString(CryptoJS.enc.Utf8);
//   if (decryptAttempt.length === 0) {
//     // Decryption failed
//     console.log("Decryption failed");
//     return;
//   } 
//   // Decryption succeeded
//   authKey = decryptAttempt;
//   isDecrypted = true;
//   localStorage.setItem("authKey", authKey);
//   localStorage.setItem("isDecrypted", isDecrypted);
//   console.log("Decryption succeeded");
//   console.log(`authKey: ${authKey}`);
//   octokit = new Octokit({auth: authKey});
//   attemptForm.hidden = true;
//   ethanForm.hidden = false;
//   // octokit.request('GET /rate_limit');
// }

// function create_or_update_post(content) {
//   if (!isDecrypted) return;
//   octokit.request('GET /repos/kangae-burner/kangae-data/contents/', {
//     owner: 'kangae-burner',
//     repo: 'kangae-data'
//   })
//     .then(data => {
//       console.log(data.data)
//       let obj = data.data.find(o => o.name === 'ethan');
//       return octokit.request('PUT /repos/kangae-burner/kangae-data/contents/ethan', {
//         owner: 'kangae-burner',
//         repo: 'kangae-data',
//         message: 'message',
//         content: base64.encode(content),
//         sha: obj.sha
//       })
//     })
//     .then(data => {
//       console.log(data);
//     });
// }

// // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo

// // octokit.request('GET /rate_limit');

// // new Octokit({ auth: `` });

// // octokit.request('GET /repos/kangae-burner/kangae-data/contents/', {
// //   owner: 'kangae-burner',
// //   repo: 'kangae-data'
// // })
// //   .then(data => {
// //     console.log(data.data)
// //     let obj = data.data.find(o => o.name === 'ethan');
// //     return octokit.request('PUT /repos/kangae-burner/kangae-data/contents/ethan', {
// //       owner: 'kangae-burner',
// //       repo: 'kangae-data',
// //       message: 'message',
// //       content: base64.encode('Hello Again ' . Math.random()),
// //       sha: obj.sha
// //     })
// //   })
// //   .then(data => {
// //     console.log(data);
// //   });

// // octokit.request('PUT /repos/kangae-burner/kangae-data/contents/ethan', {
// //   owner: 'kangae-burner',
// //   repo: 'kangae-data',
// //   message: 'message',
// //   content: base64.encode('Hello World'),
// // })
// //   .then(data => {
// //     console.log(data);
// //   });