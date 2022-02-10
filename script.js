const { Octokit } = require("@octokit/core");
var octokit;
var JsCrypto = require('jscrypto');
const base64 = require('base-64');
const auth_encrypted = 'U2FsdGVkX1+0h1Neznmevm45G2kHH7l+75j55FsyoZMn5o7FEyz0wZTUSFuMtNNzts8aBd7na6hdcNkp4IxJzg==';
var authKey = localStorage.getItem("authKey") || '';
var isDecrypted = localStorage.getItem("isDecrypted") || false;
var attemptForm = document.querySelector("#attempt");
var ethanForm = document.querySelector("#ethan");
ethanForm.hidden = true;
var currentSha = localStorage.getItem("currentSha") || '';

if (isDecrypted) {
  octokit = new Octokit({auth: authKey});
  attemptForm.hidden = true;
  ethanForm.hidden = false;
}

attemptForm.addEventListener("submit", function(e) {
  e.preventDefault();
  console.log(attemptForm.password.value)
  attempt_decryption(attemptForm.password.value);
});
ethanForm.addEventListener("submit", function(e) {
  e.preventDefault();
  console.log(ethanForm.text.value)
  create_or_update_post(ethanForm.text.value);
});

function attempt_decryption(password) {
  if (isDecrypted) return;
  var decryptAttempt = '';
  try {
    decryptAttempt = JsCrypto.AES.decrypt(auth_encrypted, password).toString(JsCrypto.Utf8)
  } catch (e) {
    console.log(e);
  }
  if (decryptAttempt.length === 0) {
    // Decryption failed
    console.log("Decryption failed");
    return;
  } 
  // Decryption succeeded
  authKey = decryptAttempt;
  isDecrypted = true;
  localStorage.setItem("authKey", authKey);
  localStorage.setItem("isDecrypted", isDecrypted);
  console.log("Decryption succeeded");
  console.log(`authKey: ${authKey}`);
  octokit = new Octokit({auth: authKey});
  attemptForm.hidden = true;
  ethanForm.hidden = false;
  // octokit.request('GET /rate_limit');
}

function create_or_update_post(content) {
  if (!isDecrypted) return;
  getSha('ethan')
    .then(sha => {
      return octokit.request('PUT /repos/kangae-burner/kangae-data/contents/ethan', {
        owner: 'kangae-burner',
        repo: 'kangae-data',
        message: 'message',
        content: base64.encode(content),
        sha: currentSha
      })
    })
    .then(data => {
      console.log(data);
      currentSha = data.data.content.sha;
      localStorage.setItem("currentSha", currentSha);
    })
    .catch(err => {
      currentSha = '';
      localStorage.setItem("currentSha", '');
      console.log(err);
    });
}

function getSha (name) {
  return new Promise((resolve, reject) => {
    if (currentSha.length > 0) return resolve();
    return octokit.request(`GET /repos/kangae-burner/kangae-data/contents/?cachebust=${Math.random()}`, {
      owner: 'kangae-burner',
      repo: 'kangae-data'
    })
    .then(data => {
      console.log(data.data)
      let obj = data.data.find(o => o.name === name);
      currentSha = obj.sha;
      localStorage.setItem("currentSha", currentSha);
      return resolve();
    })
    .catch(err => {
      console.log(err);
      currentSha = '';
      localStorage.setItem("currentSha", '');
      return reject();
    });
  });
}

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo

// octokit.request('GET /rate_limit');

// new Octokit({ auth: `` });

// octokit.request('GET /repos/kangae-burner/kangae-data/contents/', {
//   owner: 'kangae-burner',
//   repo: 'kangae-data'
// })
//   .then(data => {
//     console.log(data.data)
//     let obj = data.data.find(o => o.name === 'ethan');
//     return octokit.request('PUT /repos/kangae-burner/kangae-data/contents/ethan', {
//       owner: 'kangae-burner',
//       repo: 'kangae-data',
//       message: 'message',
//       content: base64.encode('Hello Again ' . Math.random()),
//       sha: obj.sha
//     })
//   })
//   .then(data => {
//     console.log(data);
//   });

// octokit.request('PUT /repos/kangae-burner/kangae-data/contents/ethan', {
//   owner: 'kangae-burner',
//   repo: 'kangae-data',
//   message: 'message',
//   content: base64.encode('Hello World'),
// })
//   .then(data => {
//     console.log(data);
//   });